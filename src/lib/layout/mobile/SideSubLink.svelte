<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();

	let active = $state(false);
	run(() => {
		active = $page.url.pathname.includes(href);
	});
</script>

<a {href} class="w-100% pl-5 decoration-none" class:bg-pink-950={!active} class:bg-pink-700={active}>
  <div class="b-l-pink-800 b-l-3 b-l-dotted text-white flex flex-items-center p-2 p-l8">
    {@render children?.()}
  </div>
</a>