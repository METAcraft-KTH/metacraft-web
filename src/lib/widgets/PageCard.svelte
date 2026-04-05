<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col flex-items-center">
	<div class="bg-white border-rounded-1">
		{@render children?.()}
	</div>
</div>
