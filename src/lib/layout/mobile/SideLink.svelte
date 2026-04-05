<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $derived(page.url.pathname.includes(href));
</script>

<a {href} class="pl-2 w-100% decoration-none" class:bg-pink-700={active}>
  <div class="flex flex-items-center p-2 p-l4 text-white text-lg b-l-pink-600 b-l-5 b-l-solid mc7">
    {@render children?.()}
  </div>
</a>