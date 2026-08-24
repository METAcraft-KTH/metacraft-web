<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<code class="inline-block bg-black px-1 font-mc text-white text-sm">{@render children?.()}</code>
