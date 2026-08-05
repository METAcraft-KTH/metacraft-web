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
<div class="fixed flex justify-center w-full transition-all" class:bg-pink-900={!hideHeader}>
	<!-- a wrapper element to make sure the elements dont get too separated on ultrawide -->
	<div class="top-0 flex flex-row justify-between w-full max-w-[80rem] h-14">
		<a href="/" class="flex items-center p-2 w-[115px] hover:text-pink-100" class:text-pink-300={!hideHeader} class:text-white={hideHeader}>
			<Logo />
		</a>
	
		<div class="flex flex-row h-full text-pink-400">
			<HeaderLink href="/smp" dropdown={smp}>Survival</HeaderLink>
			<HeaderLink href="/campus">Campus</HeaderLink>
			<HeaderLink href="/event">Tävlingar</HeaderLink>
			<HeaderLink href="/install">Voice Chat</HeaderLink>
			<HeaderLink href="/rules">Regler</HeaderLink>
			<HeaderLink href="/sok">Hjälp oss</HeaderLink>
		</div>

		<a href="/discord" target="_blank" class="inline-block p-3 w-[115px] h-full hover:text-pink-100 text-right" class:text-pink-300={!hideHeader} class:text-white={hideHeader}>
			<Discord />
		</a>
	</div>
</div>