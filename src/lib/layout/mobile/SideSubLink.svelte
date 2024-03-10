<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	let active = false;
	$: active = $page.url.pathname.includes(href);
</script>

<a {href} class="w-100% pl-5 decoration-none" class:bg-pink-950={!active} class:bg-pink-700={active}>
  <div class="b-l-pink-800 b-l-3 b-l-dotted text-white flex flex-items-center p-2 p-l8">
    <slot />
  </div>
</a>