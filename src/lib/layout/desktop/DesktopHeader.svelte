<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";
	import Discord from "$lib/icons/Discord.svelte";
	import Logo from '$lib/icons/MetacraftLogo.svelte';

	import { page } from '$app/stores';
	$: isOnHomePage = $page.url.pathname === '/';

	export let hideHeader: boolean;

	// dropdowns
	let smp = [
		["/tweaks", "Justeringar"],
		["/map", "Världskarta"],
		["/lore", "Lore"]
	];
	let event = [
		["/leaderboard", "Topplista"]
	];
</script>
<div class="flex justify-center fixed w-100% transition-all" class:bg-pink-900={!hideHeader}>
	<!-- a wrapper element to make sure the elements dont get too separated on ultrawide -->
	<div class="flex flex-row flex-justify-between top-0 w-100% max-w-[80rem] h-14">
		<a href="/" class="w-115px p-2 flex flex-items-center color-pink-300 hover:color-pink-100" class:color-white={hideHeader}>
			<Logo />
		</a>
	
		<div class="h-100% flex flex-row text-pink-400">
			<HeaderLink href="/smp">Survival</HeaderLink>
			<HeaderLink href="/campus">Campus</HeaderLink>
			<HeaderLink href="/event">Event</HeaderLink>
			<HeaderLink href="/rules">Regler</HeaderLink>
			<HeaderLink href="/about">Hjälp oss</HeaderLink>
		</div>

		<a href="/discord" target="_blank" class="inline-block w-115px h-100% color-pink-300 hover:color-pink-100 p-3 text-right" class:color-white={hideHeader}>
			<Discord />
		</a>
	</div>
</div>