<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	let active = false;
	$: active = $page.url.pathname === href;
</script>

<a {href} class="b-l-pink-700 b-l-7 b-l-solid relative color-white no-underline inline-block px-2 py-3 lg:px-8 h-100% flex flex-items-center" class:bg-pink-900={active} class:hover:bg-pink-700={!active}>
  <slot />
</a>