<script lang="ts">
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import overlayUrl from '$lib/images/ovve-overlay.png';
	import SkinViewer from '$lib/widgets/SkinViewer.svelte';
	import OptionSwitcher from '$lib/widgets/OptionSwitcher.svelte';

	const SKIN_SIZE = 64;

	let fileInput: HTMLInputElement;
	let dragging = $state(false);
	let error = $state('');
	let originalUrl = $state('');
	let resultUrl = $state('');
	let fileName = $state('skin');
	let showOvve = $state(true);
	let slimArms = $state(false);
	let username = $state('');
	let fetching = $state(false);

	const ovveOptions = $derived<[string, boolean][]>([
		[m.style_with_ovve(), true],
		[m.style_without_ovve(), false]
	]);

	const armOptions = $derived<[string, boolean][]>([
		[m.style_arms_wide(), false],
		[m.style_arms_slim(), true]
	]);

	function load(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	/** Draw overlay on top of the skin; overlay's pure-green pixels erase the skin instead. */
	async function generate(skin: CanvasImageSource) {
		const overlay = await load(overlayUrl);

		const canvas = document.createElement('canvas');
		canvas.width = SKIN_SIZE;
		canvas.height = SKIN_SIZE;
		const ctx = canvas.getContext('2d')!;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(skin, 0, 0);
		ctx.drawImage(overlay, 0, 0);

		// read the green key from the overlay, not the composite, so skins
		// containing 00FF00 of their own survive
		const mask = document.createElement('canvas');
		mask.width = SKIN_SIZE;
		mask.height = SKIN_SIZE;
		const maskCtx = mask.getContext('2d')!;
		maskCtx.drawImage(overlay, 0, 0);

		const out = ctx.getImageData(0, 0, SKIN_SIZE, SKIN_SIZE);
		const key = maskCtx.getImageData(0, 0, SKIN_SIZE, SKIN_SIZE).data;
		for (let i = 0; i < key.length; i += 4) {
			if (key[i] === 0 && key[i + 1] === 255 && key[i + 2] === 0) {
				out.data[i + 3] = 0;
			}
		}
		ctx.putImageData(out, 0, 0);

		return canvas.toDataURL('image/png');
	}

	/**
	 * Convert a legacy 64x32 skin to 64x64 by mirroring the single arm and leg
	 * into the second set of limbs, the same way Minecraft does.
	 */
	function widen(skin: HTMLImageElement) {
		const canvas = document.createElement('canvas');
		canvas.width = SKIN_SIZE;
		canvas.height = SKIN_SIZE;
		const ctx = canvas.getContext('2d')!;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(skin, 0, 0);

		// [sourceX, sourceY, width, height, destX, destY] per face, mirrored
		const limbs: [number, number, number, number, number, number][] = [
			[4, 16, 4, 4, 20, 48], [8, 16, 4, 4, 24, 48], // leg top/bottom
			[0, 20, 4, 12, 24, 52], [4, 20, 4, 12, 20, 52], // leg outer/front
			[8, 20, 4, 12, 16, 52], [12, 20, 4, 12, 28, 52], // leg inner/back
			[44, 16, 4, 4, 36, 48], [48, 16, 4, 4, 40, 48], // arm top/bottom
			[40, 20, 4, 12, 40, 52], [44, 20, 4, 12, 36, 52], // arm outer/front
			[48, 20, 4, 12, 32, 52], [52, 20, 4, 12, 44, 52] // arm inner/back
		];

		ctx.save();
		ctx.scale(-1, 1);
		for (const [sx, sy, w, h, dx, dy] of limbs) {
			ctx.drawImage(skin, sx, sy, w, h, -dx - w, dy, w, h);
		}
		ctx.restore();

		return canvas;
	}

	/** Validate a loaded image is a skin, widening legacy ones, then render the result. */
	async function apply(url: string, name: string) {
		let skin: HTMLImageElement;
		try {
			skin = await load(url);
		} catch {
			URL.revokeObjectURL(url);
			error = m.style_error_read();
			return;
		}

		if (skin.width !== SKIN_SIZE || (skin.height !== SKIN_SIZE && skin.height !== SKIN_SIZE / 2)) {
			URL.revokeObjectURL(url);
			error = m.style_error_size({ width: skin.width, height: skin.height });
			return;
		}

		let source: CanvasImageSource = skin;
		if (skin.height !== SKIN_SIZE) {
			const wide = widen(skin);
			source = wide;
			// the previews need a 64x64 original too, so replace the legacy blob URL
			URL.revokeObjectURL(url);
			url = wide.toDataURL('image/png');
		}

		fileName = name;
		originalUrl = url;
		resultUrl = await generate(source);
	}

	async function handle(file: File | undefined) {
		if (!file) return;
		error = '';

		if (file.type !== 'image/png') {
			error = m.style_error_type();
			return;
		}

		await apply(URL.createObjectURL(file), file.name.replace(/\.png$/i, ''));
	}

	async function fetchByName() {
		const name = username.trim();
		if (!name || fetching) return;
		error = '';
		fetching = true;
		try {
			// ponytail: playerdb is the lookup because Mojang's own name->UUID API sends no
			// CORS headers and every image proxy answers 200-with-Steve for unknown names.
			// Its 400 is the only clean "no such player" signal. The skin itself still comes
			// straight from Mojang's CDN, which is CORS-open.
			const res = await fetch(`https://playerdb.co/api/player/minecraft/${encodeURIComponent(name)}`);
			if (!res.ok) throw new Error(String(res.status));
			const player = (await res.json()).data.player;

			const textures = JSON.parse(atob(player.properties[0].value)).textures;
			if (!textures.SKIN) throw new Error('no skin');
			slimArms = textures.SKIN.metadata?.model === 'slim';

			const skin = await fetch(textures.SKIN.url.replace(/^http:/, 'https:'));
			if (!skin.ok) throw new Error(String(skin.status));
			await apply(URL.createObjectURL(await skin.blob()), player.username);
		} catch {
			error = m.style_error_username();
		} finally {
			fetching = false;
		}
	}

	function reset() {
		if (originalUrl) URL.revokeObjectURL(originalUrl);
		originalUrl = '';
		resultUrl = '';
		error = '';
		showOvve = true;
		slimArms = false;
		username = '';
		fileInput.value = '';
	}
</script>

<!-- CUSTOM BG -->
<div class="-z-10 fixed bg-bookshelf bg-cover bg-center w-lvw h-lvh"></div>

<Title>
	{m.style_title()}
</Title>

<PageDescription>
	{m.style_description()}
</PageDescription>

<Main>
	<div class="mx-auto w-full max-w-150">
		<input
			bind:this={fileInput}
			type="file"
			accept="image/png"
			class="hidden"
			onchange={(e) => handle(e.currentTarget.files?.[0])}
		/>

		{#if !resultUrl}
			<button
				type="button"
				class="flex flex-col justify-center items-center gap-3 border-4 border-black/30 hover:border-black/60 {dragging ? 'border-black/60 bg-black/5' : ''} border-dashed p-8 rounded-lg w-full min-h-60 text-center transition-colors notButton"
				onclick={() => fileInput.click()}
				ondragover={(e) => { e.preventDefault(); dragging = true; }}
				ondragleave={() => (dragging = false)}
				ondrop={(e) => {
					e.preventDefault();
					dragging = false;
					handle(e.dataTransfer?.files?.[0]);
				}}
			>
				<img src={overlayUrl} alt="" class="w-16 h-16 pixel" />
				<span class="font-mc">{m.style_dropzone()}</span>
			</button>

			<p class="my-4 font-mc text-center">{m.style_or()}</p>

			<form class="flex sm:flex-row flex-col gap-3" onsubmit={(e) => { e.preventDefault(); fetchByName(); }}>
				<input
					type="text"
					bind:value={username}
					placeholder={m.style_username_placeholder()}
					autocomplete="off"
					spellcheck="false"
					class="flex-1 bg-white/80 px-4 py-3 border-4 border-black/30 focus:border-black/60 border-solid rounded-lg outline-none font-mc"
				/>
				<button
					type="submit"
					disabled={fetching || !username.trim()}
					class="bg-map disabled:opacity-50 px-6 py-3 font-mc text-black text-center hover:contrast-150 transition-all hover:-translate-y-1 disabled:translate-y-0 notButton"
				>
					{m.style_username_fetch()}
				</button>
			</form>
		{:else}
			<OptionSwitcher
				options={ovveOptions}
				bind:selected={showOvve}
				value={([, on]) => on}
				label={([name]) => name}
			/>

			<SkinViewer
				src={showOvve ? resultUrl : originalUrl}
				slim={slimArms}
				alt={showOvve ? m.style_preview_result() : m.style_preview_original()}
			/>

			<OptionSwitcher
				options={armOptions}
				bind:selected={slimArms}
				value={([, on]) => on}
				label={([name]) => name}
			/>

			<div class="flex justify-center items-start gap-8 mt-6">
				<figure class="flex flex-col items-center gap-2">
					<img src={originalUrl} alt={m.style_preview_original()} class="w-20 h-20 pixel" />
					<figcaption class="font-mc text-sm">{m.style_preview_original()}</figcaption>
				</figure>
				<figure class="flex flex-col items-center gap-2">
					<img src={resultUrl} alt={m.style_preview_result()} class="w-20 h-20 pixel checker" />
					<figcaption class="font-mc text-sm">{m.style_preview_result()}</figcaption>
				</figure>
			</div>

			<div class="flex sm:flex-row flex-col justify-center gap-4 mt-8">
				<a
					href={resultUrl}
					download="{fileName}-metacraft.png"
					class="bg-map px-6 py-3 font-mc text-black text-center no-underline hover:contrast-150 transition-all hover:-translate-y-1"
				>
					{m.style_download()}
				</a>
				<button
					type="button"
					class="bg-map px-6 py-3 font-mc text-black text-center hover:contrast-150 transition-all hover:-translate-y-1 notButton"
					onclick={reset}
				>
					{m.style_reset()}
				</button>
			</div>

			<p class="mt-6 text-center text-sm">{m.style_help()}</p>
		{/if}

		{#if error}
			<p class="mt-4 font-mc text-red-800 text-center">{error}</p>
		{/if}
	</div>
</Main>

<style>
	.pixel {
		image-rendering: pixelated;
	}
	/* show transparency on the generated skin */
	.checker {
		background-image:
			linear-gradient(45deg, #0002 25%, transparent 25%, transparent 75%, #0002 75%),
			linear-gradient(45deg, #0002 25%, transparent 25%, transparent 75%, #0002 75%);
		background-size: 16px 16px;
		background-position: 0 0, 8px 8px;
	}
</style>
