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
