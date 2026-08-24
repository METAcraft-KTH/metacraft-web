<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- the inline <code> chip styling would look wrong inside a block -->
<style>
	pre :global(code) {
		display: block;
		background: none;
		padding: 0;
		color: inherit;
	}
</style>

<pre class="bg-black mb-6 p-4 rounded overflow-x-auto font-mc text-white text-sm">{@render children?.()}</pre>
