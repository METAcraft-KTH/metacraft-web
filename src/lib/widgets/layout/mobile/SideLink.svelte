<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	let active = false;
	$: active = $page.url.pathname === href;
</script>

<a {href} class="w-100% pl-2 decoration-none" class:bg-pink-700={active}>
  <div class="b-l-pink-600 b-l-5 b-l-solid text-white text-xl flex flex-items-center p-3 mc7">
    <slot />
  </div>
</a>