<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<h1 class="py-2 font-ten text-black text-4xl md:text-5xl">{@render children?.()}</h1>