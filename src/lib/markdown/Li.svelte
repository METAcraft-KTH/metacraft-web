<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- markdown wraps loose list items in <p>, which would add unwanted margin -->
<style>
	li :global(p) {
		margin-bottom: 0;
	}
</style>

<li class="mb-1">{@render children?.()}</li>
