<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<style>
	blockquote :global(p:last-child) {
		margin-bottom: 0;
	}
</style>

<blockquote class="mb-6 pl-4 border-neutral-400 border-l-4 text-neutral-600 italic">
	{@render children?.()}
</blockquote>
