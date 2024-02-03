<script lang="ts">
	import logo from '$lib/images/logo_big.png';
  import Menu from '$lib/icons/Menu.svelte';
  import discord from '$lib/icons/discord.svg';
  import Map from '$lib/icons/Map.svelte';
	import Sidebar from '$lib/widgets/layout/mobile/Sidebar.svelte';

	import { page } from '$app/stores';

	let sideVisible = false;
	$: {
		$page;
		sideVisible = false;
	}
</script>

<div class="flex flex-justify-between bg-pink-800 fixed top-0 w-100% h-16">

	<button on:click={() => sideVisible = !sideVisible} class="notButton inline-block h-100% aspect-square color-pink-400 hover:color-pink-100 p-2" class:color-white={sideVisible}>
		<Menu />
	</button>

	<a href="/" class="aspect-3 text-center p-2">
		<img src={logo} alt="metacraft logo">
	</a>

	<a href="/map" class="inline-block h-100% aspect-square color-pink-400 hover:color-pink-100 p-3" class:color-white={$page.url.pathname === '/map'}>
		<Map />
	</a>
</div>

<Sidebar {sideVisible} />