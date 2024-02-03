<script lang="ts">
	import HeaderDropdown from "./HeaderDropdown.svelte";
	import { page } from '$app/stores';
	export let href: string;
	export let dropdown: Array<Array<string>> = [];

	let active = false;
	$: active = $page.url.pathname === href;

	let hovered = false;
</script>

<a {href}
	class="relative color-white no-underline inline-block px-4 lg:px-8 h-100% flex flex-justify-center flex-items-center mc7"
	class:bg-pink-900={active}
	class:hover:bg-pink-700={!active}
	on:mouseover={() => hovered = true}
	on:focus={()=>{/* a11y wants an on:focus event, i guess */}}
	on:mouseleave={() => hovered = false}
>
	<slot />
	{#if dropdown.length > 1}
		<HeaderDropdown bind:hovered={hovered} elements={dropdown}>
		</HeaderDropdown>
	{/if}
</a>
