<script lang="ts">
	interface Props {
		id?: string;
		children?: import('svelte').Snippet;
	}

	let { id, children }: Props = $props();
</script>

<h3 {id} class="mt-6 mb-3 font-bold text-lg">{@render children?.()}</h3>
