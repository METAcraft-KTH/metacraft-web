<script lang="ts">
	import { getContext, setContext } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	// each list is its own component instance, so scoped CSS cannot style a
	// nested list from its parent - the depth has to be threaded through.
	const depth: number = getContext('list-depth') ?? 0;
	setContext('list-depth', depth + 1);

	const markers = ['list-disc', '[list-style-type:circle]', '[list-style-type:square]'];
</script>

<ul class="{depth === 0 ? 'mb-6 ml-4' : 'ml-4'} {markers[Math.min(depth, markers.length - 1)]}">
	{@render children?.()}
</ul>
