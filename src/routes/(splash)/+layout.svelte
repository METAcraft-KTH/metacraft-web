<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Header splashPage={true} />
<div class="w-100%">
	<!--
		this wrapper is required for top level elements in +page to properly respect height rule,
		most notably the splash page that hides overflow when the screen isnt tall enough.
	-->
	{@render children?.()}
</div>
<Footer />