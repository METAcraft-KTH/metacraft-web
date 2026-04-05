<script lang="ts">
	import HeaderDropdown from "./HeaderDropdown.svelte";
	import { page } from '$app/state';
	interface Props {
		href: string;
		dropdown?: Array<Array<string>>;
		children?: import('svelte').Snippet;
	}

	let { href, dropdown = [], children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));

	let hovered = $state(false);
</script>

<a {href}
	class="inline-block relative flex flex-justify-center flex-items-center px-4 lg:px-8 h-100% text-center no-underline transition-all color-white mc7"
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
