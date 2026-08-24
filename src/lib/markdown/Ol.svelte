<script lang="ts">
	import { getContext, setContext } from 'svelte';

	interface Props {
		start?: number;
		children?: import('svelte').Snippet;
	}

	let { start, children }: Props = $props();

	const depth: number = getContext('list-depth') ?? 0;
	setContext('list-depth', depth + 1);

	const markers = ['list-decimal', 'list-[lower-alpha]', 'list-[lower-roman]'];
</script>

<ol {start} class="{depth === 0 ? 'mb-6 ml-4' : 'ml-4'} {markers[Math.min(depth, markers.length - 1)]}">
	{@render children?.()}
</ol>
