<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="relative flex flex-items-center px-2 lg:px-8 py-3 h-100% text-sans no-underline b-l-pink-700 b-l-7 b-l-solid color-white" class:bg-pink-700={active} class:hover:bg-pink-700={!active}>
  {@render children?.()}
</a>