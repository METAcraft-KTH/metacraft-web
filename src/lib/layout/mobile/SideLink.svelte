<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="pl-2 w-full no-underline" class:bg-pink-700={active}>
  <div class="flex items-center p-2 pl-4 border-l-5 border-l-pink-600 border-solid font-mc text-white text-lg">
    {@render children?.()}
  </div>
</a>