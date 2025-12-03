<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import type { ComponentType } from 'svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/layout/standard/Title.svelte';
</script>

<Header />
<div class="w-100% flex-1 bg-bookshelf">
	<Title>RESOURCE PACKS</Title>
	<div class="flex flex-col lg:flex-row gap-4 max-w-[80rem] mx-auto mb-4">
		<div class="flex flex-col gap-2 flex-1 bg-book p-10 leading-tight">
			<div class="mc10 text-2xl md:text-3xl">Primary</div>
			The default METAcraft resource pack. Replaces pink with cerise and contains the textures for some GUIs.
			<a href="http://metacraft.nu:25585/da0fea11-6c24-4735-83f0-f2975c381ec6">Download</a>
		</div>
		<div class="flex flex-col gap-2 flex-1 bg-book p-10 leading-tight">
			<div class="mc10 text-2xl md:text-3xl">Shop Key</div>
			A small resource pack containing a texture for the shop key.
			<a href="http://metacraft.nu:25585/b2b09336-93c6-49a7-a6b3-f283e224f272">Download</a>
		</div>
	</div>
	<div class="flex flex-col lg:flex-row gap-4 max-w-[80rem] mx-auto mb-4">
		<div class="flex flex-col gap-2 flex-1 bg-book p-10 leading-tight">
			<div class="mc10 text-2xl md:text-3xl">McMakistein's Impossible Dragon</div>
			Assets for McMakistein's Crystalspine bossfight, updated to the latest version.
			<a href="http://metacraft.nu:25585/01af3a72-d7e1-4da6-b026-55dabc7eb0df">Download</a>
			<a href="https://mcmakistein.com/creations/impossible_enderdragon">Original Datapack</a>
		</div>
		<div class="flex flex-col gap-2 flex-1 bg-book p-10 leading-tight">
			<div class="mc10 text-2xl md:text-3xl">End Boss Music</div>
			Adds "The end at hand" music by solunary for the Ender Dragon bossfight.
			<a href="http://metacraft.nu:25585/38080a1d-18e9-47a8-8489-586e96018e2c">Download</a>
			<div>Listen online at: <a href="https://www.youtube.com/watch?v=K3mVoCwEaqk">https://www.youtube.com/watch?v=K3mVoCwEaqk</a></div>
		</div>
	</div>
</div>
<Footer />

<style>
	.background {
		background-image: radial-gradient(
        #271f1f70,
        #271f1ff0
      ), url("$lib/images/splashes/main.webp")
	}
</style>
