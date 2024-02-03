<script>
	import HeaderLink from "./HeaderLink.svelte";
	import Discord from "$lib/icons/Discord.svelte";
	import Logo from '$lib/icons/MetacraftLogo.svelte';

	import { page } from '$app/stores';
	$: isOnHomePage = $page.url.pathname === '/';

	// the two dropdowns
	let info = [
		["/tweaks", "Justeringar"],
		["/shop", "Ekonomi"],
		["/crafting", "Crafting"],
		["/zones", "Världszoner"],
		["/lore", "Lore"]
	];
	let news = [
		["/events", "Event"],
		["/updates", "Uppdateringar"]
	];
</script>
<div class="flex flex-row flex-justify-between bg-pink-800 fixed top-0 w-100% h-14">

	<a href="/" class="w-115px p-2 flex flex-items-center color-pink-400 hover:color-pink-100">
		<Logo />
	</a>

	<div class="h-100% flex flex-row">
		<HeaderLink href="/info" dropdown={info}>Upptäck</HeaderLink>
		<HeaderLink href="/rules">Regler</HeaderLink>
		<HeaderLink href="/news" dropdown={news}>Nyheter</HeaderLink>
		<HeaderLink href="/map">Live-karta</HeaderLink>
		<HeaderLink href="/faq">FAQ</HeaderLink>
	</div>
	<a href="https://dsekt.se/metacraft" target="_blank" class="inline-block w-115px h-100% color-pink-400 hover:color-pink-100 p-3 text-right">
		<Discord />
	</a>
</div>