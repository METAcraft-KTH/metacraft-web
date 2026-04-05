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

<a {href} class="w-100% pl-2 decoration-none" class:bg-pink-700={active}>
  <div class="b-l-pink-600 b-l-5 b-l-solid text-white text-lg flex flex-items-center p-2 p-l4 mc7">
    {@render children?.()}
  </div>
</a>