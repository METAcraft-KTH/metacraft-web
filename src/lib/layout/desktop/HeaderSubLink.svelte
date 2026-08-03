<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="relative flex items-center px-2 lg:px-8 py-3 border-l-7 border-l-pink-700 border-solid h-full font-sans text-white no-underline" class:bg-pink-700={active} class:hover:bg-pink-700={!active}>
  {@render children?.()}
</a>