<script lang="ts">
	interface Props {
		id?: string;
		children?: import('svelte').Snippet;
	}

	let { id, children }: Props = $props();
</script>

<h1 {id} class="mt-6 mb-3 font-bold text-2xl">{@render children?.()}</h1>
