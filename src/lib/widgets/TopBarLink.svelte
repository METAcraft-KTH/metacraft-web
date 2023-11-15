<script lang="ts">
	import { page } from '$app/stores';
	export let href: string;

	let active = false;
	$: active = $page.url.pathname === href;
	console.log($page.url.pathname);
</script>

<a {href} class="color-white no-underline p-4" class:bg-pink-700={active}><slot /></a>
