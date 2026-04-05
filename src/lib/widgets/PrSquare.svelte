<script lang="ts">
	interface Props {
		image?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
	}

	let { image, title, content }: Props = $props();
</script>

<div class="flex flex-row">
	<div class="max-w-300px">
		{@render image?.()}
	</div>
	<div class="flex flex-col p-l-4">
		<div class="font-size-8">
			{@render title?.()}
		</div>
		<div class="max-w-300px p-t-4">
			{@render content?.()}
		</div>
	</div>
</div>
