<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	let active = false;
	$: active = $page.url.pathname.includes(href);
</script>

<a {href} class="w-100% pl-2 decoration-none" class:bg-pink-700={active}>
  <div class="b-l-pink-600 b-l-5 b-l-solid text-white text-lg flex flex-items-center p-2 p-l4 mc7">
    <slot />
  </div>
</a>