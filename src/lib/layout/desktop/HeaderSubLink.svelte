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

<a {href} class="b-l-pink-700 b-l-7 b-l-solid relative color-white no-underline inline-block px-2 py-3 default-font lg:px-8 h-100% flex flex-items-center" class:bg-pink-700={active} class:hover:bg-pink-700={!active}>
  {@render children?.()}
</a>