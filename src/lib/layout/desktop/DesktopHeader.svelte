<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";
	import Discord from "$lib/icons/Discord.svelte";
	import Logo from '$lib/icons/MetacraftLogo.svelte';

	import { page } from '$app/stores';
	let isOnHomePage = $derived($page.url.pathname === '/');

	interface Props {
		hideHeader: boolean;
	}

	let { hideHeader }: Props = $props();

	// dropdowns
	let smp = [
		["/smp/features", "Features"],
		["/smp/map", "Världskarta"],
		["/smp#history", "Serverhistorik"]
	];
	let event = [
		["/leaderboard", "Topplista"]
	];
</script>
<div class="fixed flex justify-center w-100% transition-all" class:bg-pink-900={!hideHeader}>
	<!-- a wrapper element to make sure the elements dont get too separated on ultrawide -->
	<div class="top-0 flex flex-row flex-justify-between w-100% max-w-[80rem] h-14">
		<a href="/" class="flex flex-items-center p-2 w-115px color-pink-300 hover:color-pink-100" class:color-white={hideHeader}>
			<Logo />
		</a>
	
		<div class="flex flex-row h-100% text-pink-400">
			<HeaderLink href="/smp" dropdown={smp}>Survival</HeaderLink>
			<HeaderLink href="/campus">Campus</HeaderLink>
			<HeaderLink href="/event">Tävlingar</HeaderLink>
			<HeaderLink href="/install">Voice Chat</HeaderLink>
			<HeaderLink href="/rules">Regler</HeaderLink>
			<HeaderLink href="/sok">Hjälp oss</HeaderLink>
		</div>

		<a href="/discord" target="_blank" class="inline-block p-3 w-115px h-100% text-right color-pink-300 hover:color-pink-100" class:color-white={hideHeader}>
			<Discord />
		</a>
	</div>
</div>