<script lang="ts">
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import overlayUrl from '$lib/images/ovve-overlay.png';
	import templateWide from '$lib/images/template-wide.png';
	import templateSlim from '$lib/images/template-slim.png';
	import SkinViewer from '$lib/widgets/SkinViewer.svelte';
	import OptionSwitcher from '$lib/widgets/OptionSwitcher.svelte';

	const SKIN_SIZE = 64;

	// ponytail: every variant points at the one overlay that exists today. Swap in
	// the real art per entry as it lands; nothing else here needs to change.
	const VARIANTS: { id: string; label: () => string; overlay: string | null }[] = [
		{ id: 'none', label: () => m.style_variant_none(), overlay: null },
		{ id: '1', label: () => m.style_variant_1(), overlay: overlayUrl },
		{ id: '2', label: () => m.style_variant_2(), overlay: overlayUrl },
		{ id: '3', label: () => m.style_variant_3(), overlay: overlayUrl },
		{ id: '4', label: () => m.style_variant_4(), overlay: overlayUrl },
		{ id: '5', label: () => m.style_variant_5(), overlay: overlayUrl }
	];

	let fileInput: HTMLInputElement;
	let dragging = $state(false);
	let error = $state('');
	let originalUrl = $state('');
	let resultUrl = $state('');
	let fileName = $state('skin');
	let slimArms = $state(false);
	let username = $state('');
	let fetching = $state(false);
	let variant = $state('1');

	/** The 64x64 source the overlay composites onto; kept so variants can re-render. */
	let source: CanvasImageSource | null = null;

	const armOptions = $derived<[string, boolean][]>([
		[m.style_arms_wide(), false],
		[m.style_arms_slim(), true]
	]);

	// Nothing loaded yet: show the UV template so the viewer is never empty.
	const shown = $derived(resultUrl || originalUrl || (slimArms ? templateSlim : templateWide));

	function load(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	/** Draw overlay on top of the skin; overlay's pure-green pixels erase the skin instead. */
	async function generate(skin: CanvasImageSource, overlayHref: string) {
		const overlay = await load(overlayHref);

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

	/** Composite the selected variant over the loaded skin. */
	async function render() {
		const overlay = VARIANTS.find((v) => v.id === variant)?.overlay;
		resultUrl = source && overlay ? await generate(source, overlay) : '';
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

		source = skin;
		if (skin.height !== SKIN_SIZE) {
			const wide = widen(skin);
			source = wide;
			// the previews need a 64x64 original too, so replace the legacy blob URL
			URL.revokeObjectURL(url);
			url = wide.toDataURL('image/png');
		}

		if (originalUrl) URL.revokeObjectURL(originalUrl);
		fileName = name;
		originalUrl = url;
		await render();
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
		source = null;
		slimArms = false;
		username = '';
		fileInput.value = '';
	}

	function pick(id: string) {
		variant = id;
		render();
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
	<input
		bind:this={fileInput}
		type="file"
		accept="image/png"
		class="hidden"
		onchange={(e) => handle(e.currentTarget.files?.[0])}
	/>

	<div class="items-start gap-8 grid lg:grid-cols-2 mx-auto w-full max-w-250">
		<!-- LEFT: always-on preview, doubling as the drop target -->
		<div>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative rounded-lg transition-colors {dragging
					? 'bg-black/5 outline-4 outline-black/60 outline-dashed'
					: ''}"
				ondragover={(e) => {
					e.preventDefault();
					dragging = true;
				}}
				ondragleave={() => (dragging = false)}
				ondrop={(e) => {
					e.preventDefault();
					dragging = false;
					handle(e.dataTransfer?.files?.[0]);
				}}
			>
				<SkinViewer src={shown} slim={slimArms} alt={m.style_preview_result()} />

				{#if dragging}
					<div
						class="absolute inset-0 flex justify-center items-center bg-black/20 rounded-lg font-mc text-white text-center pointer-events-none"
					>
						{m.style_dropzone()}
					</div>
				{/if}
			</div>

			<OptionSwitcher
				options={armOptions}
				bind:selected={slimArms}
				value={([, on]) => on}
				label={([name]) => name}
			/>

			<!-- the viewer swallows drags to rotate, so keep an explicit browse button -->
			<button
				type="button"
				class="bg-map px-6 py-3 w-full font-mc text-black text-center hover:contrast-150 transition-all hover:-translate-y-1 notButton"
				onclick={() => fileInput.click()}
			>
				{m.style_upload()}
			</button>
			<p class="mt-2 text-center text-sm">{m.style_dropzone_hint()}</p>

			<form
				class="flex sm:flex-row flex-col gap-3 mt-4"
				onsubmit={(e) => {
					e.preventDefault();
					fetchByName();
				}}
			>
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

			{#if error}
				<p class="mt-4 font-mc text-red-800 text-center">{error}</p>
			{/if}
		</div>

		<!-- RIGHT: overlay variants -->
		<div>
			<h2 class="mb-4 font-mc text-xl">{m.style_variants_title()}</h2>

			<div class="gap-3 grid grid-cols-2 sm:grid-cols-3">
				{#each VARIANTS as v (v.id)}
					<button
						type="button"
						class={[
							'flex flex-col items-center gap-2 p-3 border-4 rounded-lg transition-all notButton',
							variant === v.id
								? 'bg-black/10 border-black/60'
								: 'bg-black/0 hover:bg-black/5 border-black/20 hover:border-black/40'
						]}
						aria-pressed={variant === v.id}
						onclick={() => pick(v.id)}
					>
						{#if v.overlay}
							<img src={v.overlay} alt="" class="w-12 h-12 pixel checker" />
						{:else}
							<span class="flex justify-center items-center w-12 h-12 text-2xl">&times;</span>
						{/if}
						<span class="font-mc text-sm">{v.label()}</span>
					</button>
				{/each}
			</div>

			<div class="flex sm:flex-row flex-col gap-4 mt-8">
				<!-- no skin loaded yet: `shown` is the UV template, which must not be
				     downloadable, so drop the href rather than just the pointer events -->
				<a
					href={originalUrl ? shown : undefined}
					download="{fileName}-metacraft.png"
					class="flex-1 bg-map px-6 py-3 font-mc text-black text-center no-underline hover:contrast-150 transition-all hover:-translate-y-1"
					class:opacity-50={!originalUrl}
					class:cursor-not-allowed={!originalUrl}
					aria-disabled={!originalUrl}
				>
					{m.style_download()}
				</a>
				{#if originalUrl}
					<button
						type="button"
						class="bg-map px-6 py-3 font-mc text-black text-center hover:contrast-150 transition-all hover:-translate-y-1 notButton"
						onclick={reset}
					>
						{m.style_reset()}
					</button>
				{/if}
			</div>

			<p class="mt-6 text-sm">{m.style_help()}</p>
		</div>
	</div>
</Main>

<style>
	.pixel {
		image-rendering: pixelated;
	}
	/* show transparency on the overlay swatches */
	.checker {
		background-image:
			linear-gradient(45deg, #0002 25%, transparent 25%, transparent 75%, #0002 75%),
			linear-gradient(45deg, #0002 25%, transparent 25%, transparent 75%, #0002 75%);
		background-size: 16px 16px;
		background-position: 0 0, 8px 8px;
	}
</style>
