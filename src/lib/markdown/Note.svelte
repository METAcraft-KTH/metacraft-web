<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<style>
	div :global(p) {
		margin-bottom: 0;
	}
</style>

<div class="mb-6 text-neutral-500 text-center italic">{@render children?.()}</div>
