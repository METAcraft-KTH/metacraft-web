<script lang="ts">
	import HeaderLink from "./HeaderLink.svelte";
	import Discord from "$lib/icons/Discord.svelte";
	import Logo from '$lib/icons/MetacraftLogo.svelte';
	import { m } from '$lib/paraglide/messages.js';

	import { page } from '$app/stores';
	let isOnHomePage = $derived($page.url.pathname === '/');

	interface Props {
		hideHeader: boolean;
	}

	let { hideHeader }: Props = $props();

	// dropdowns
	let smp = $derived([
		["/smp/features", m.nav_features()],
		// ["/smp/map", m.nav_map()],
		// ["/smp#history", m.nav_history()]
	]);
	let event = $derived([
		["/leaderboard", m.nav_leaderboard()]
	]);
</script>
<div class="fixed flex justify-center w-full transition-all" class:bg-pink-900={!hideHeader}>
	<!-- a wrapper element to make sure the elements dont get too separated on ultrawide -->
	<div class="top-0 flex flex-row justify-between w-full max-w-[80rem] h-14">
		<a href="/" class="flex items-center p-2 w-[115px] hover:text-pink-100" class:text-pink-300={!hideHeader} class:text-white={hideHeader}>
			<Logo />
		</a>
	
		<div class="flex flex-row h-full text-pink-400">
			<HeaderLink href="/smp" dropdown={smp}>{m.nav_survival()}</HeaderLink>
			<HeaderLink href="/campus">{m.nav_campus()}</HeaderLink>
			<HeaderLink href="/event">{m.nav_event()}</HeaderLink>
			<HeaderLink href="/install">{m.nav_voice_chat()}</HeaderLink>
			<HeaderLink href="/rules">{m.nav_rules()}</HeaderLink>
			<HeaderLink href="/sok">{m.nav_help_us()}</HeaderLink>
		</div>

		<a href="/discord" target="_blank" class="inline-block p-3 w-[115px] h-full hover:text-pink-100 text-right" class:text-pink-300={!hideHeader} class:text-white={hideHeader}>
			<Discord />
		</a>
	</div>
</div>