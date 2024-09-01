<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";
	import Discord from "$lib/icons/Discord.svelte";
	import Logo from '$lib/icons/MetacraftLogo.svelte';

	import { page } from '$app/stores';
	$: isOnHomePage = $page.url.pathname === '/';

	export let hideHeader: boolean;

	// the two dropdowns
	let info = [
		["/tweaks", "Justeringar"],
		["/mods", "Mods"],
		/*["/shop", "Ekonomi"],
		["/crafting", "Crafting"],
		["/zones", "Världszoner"],
		["/lore", "Lore"]*/
	];
	let news = [
		["/changelog", "Changelog"]
	];
</script>
<div class="flex flex-row flex-justify-between fixed top-0 w-100% h-14 transition-all"
	class:bg-pink-800={!hideHeader}
>

	<a href="/" class="w-115px p-2 flex flex-items-center color-pink-300 hover:color-pink-100" class:color-white={hideHeader}>
		<Logo />
	</a>

	<div class="h-100% flex flex-row text-pink-400">
	</div>
	<a href="/discord" target="_blank" class="inline-block w-115px h-100% color-pink-300 hover:color-pink-100 p-3 text-right" class:color-white={hideHeader}>
		<Discord />
	</a>
</div>