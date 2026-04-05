<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="pl-5 w-100% decoration-none" class:bg-pink-950={!active} class:bg-pink-700={active}>
  <div class="flex flex-items-center p-2 p-l8 text-white b-l-pink-800 b-l-3 b-l-dotted">
    {@render children?.()}
  </div>
</a>