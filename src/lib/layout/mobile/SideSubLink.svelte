<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="pl-5 w-full no-underline" class:bg-pink-950={!active} class:bg-pink-700={active}>
  <div class="flex items-center p-2 pl-8 border-l-3 border-l-pink-800 border-dotted text-white">
    {@render children?.()}
  </div>
</a>