<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<style>
	table :global(th),
	table :global(td) {
		border: 1px solid #0003;
		padding: 0.25rem 0.75rem;
	}
	table :global(th) {
		font-weight: bold;
	}
</style>

<div class="mb-6 overflow-x-auto">
	<table class="w-full border-collapse">{@render children?.()}</table>
</div>
