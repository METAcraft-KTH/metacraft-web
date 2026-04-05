<script lang="ts">
	import { run } from 'svelte/legacy';

	import HeaderDropdown from "./HeaderDropdown.svelte";
	import { page } from '$app/stores';
	interface Props {
		href: string;
		dropdown?: Array<Array<string>>;
		children?: import('svelte').Snippet;
	}

	let { href, dropdown = [], children }: Props = $props();

	let active = $state(false);
	run(() => {
		active = $page.url.pathname.includes(href);
	});

	let hovered = $state(false);
</script>

<a {href}
	class="relative color-white no-underline inline-block px-4 lg:px-8 h-100% flex flex-justify-center flex-items-center mc7 transition-all text-center"
	class:bg-pink-700={active}
	class:hover:bg-pink-700={!active}
	onmouseover={() => hovered = true}
	onfocus={()=>{/* a11y wants an on:focus event, i guess */}}
	onmouseleave={() => hovered = false}
>
	{@render children?.()}
	{#if dropdown.length > 0 && hovered}
		<HeaderDropdown bind:hovered={hovered} elements={dropdown}>
		</HeaderDropdown>
	{/if}
</a>
