<script lang="ts">

	import MetacraftLogo from '$lib/icons/MetacraftLogo.svelte';
	import Menu from '$lib/icons/Menu.svelte';
	import Map from '$lib/icons/Map.svelte';
	import Sidebar from './Sidebar.svelte';

	import { page } from '$app/state';

	let sideVisible = $state(false);
	$effect(() => {
		page;
		sideVisible = false;
	});

	interface Props {
		hideHeader: boolean; // om true, göm background
	}

	let { hideHeader }: Props = $props();
</script>

<div class="top-0 fixed flex justify-between w-full h-14 transition-all"
	class:bg-pink-800={!hideHeader || sideVisible}
>

	<button onmousedown={() => sideVisible = !sideVisible} class="inline-block p-2 h-full aspect-square text-left notButton" class:text-pink-400={!(sideVisible || hideHeader)} class:text-white={sideVisible || hideHeader}>
		<Menu />
	</button>

	<a href="/" class="p-2 h-full aspect-3/1 text-center" class:text-pink-400={!(hideHeader && !sideVisible)} class:text-white={hideHeader && !sideVisible}>
		<MetacraftLogo />
	</a>

	{#if false}
		<a href="/map" class="inline-block p-3 h-full aspect-square text-right" class:text-pink-400={!(page.url.pathname === '/smp/map' || (hideHeader && !sideVisible))} class:text-white={page.url.pathname === '/smp/map' || (hideHeader && !sideVisible)}>
			<Map />
		</a>
	{:else}
		<div class="inline-block p-3 h-full aspect-square"></div>
	{/if}
</div>

<Sidebar {sideVisible} />