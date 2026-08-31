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
	async function generate(skin: HTMLImageElement) {
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

	async function handle(file: File | undefined) {
		if (!file) return;
		error = '';

		if (file.type !== 'image/png') {
			error = m.style_error_type();
			return;
		}

		const url = URL.createObjectURL(file);
		let skin: HTMLImageElement;
		try {
			skin = await load(url);
		} catch {
			URL.revokeObjectURL(url);
			error = m.style_error_read();
			return;
		}

		if (skin.width !== SKIN_SIZE || skin.height !== SKIN_SIZE) {
			URL.revokeObjectURL(url);
			error = m.style_error_size({ width: skin.width, height: skin.height });
			return;
		}

		fileName = file.name.replace(/\.png$/i, '');
		originalUrl = url;
		resultUrl = await generate(skin);
	}

	function reset() {
		if (originalUrl) URL.revokeObjectURL(originalUrl);
		originalUrl = '';
		resultUrl = '';
		error = '';
		showOvve = true;
		slimArms = false;
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
