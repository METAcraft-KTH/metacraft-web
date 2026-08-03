<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<div class="bg-white rounded-xs">
		{@render children?.()}
	</div>
</div>
