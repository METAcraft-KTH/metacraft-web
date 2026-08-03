<script lang="ts">
	interface Props {
		image?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
	}

	let { image, title, content }: Props = $props();
</script>

<div class="flex flex-row">
	<div class="max-w-75">
		{@render image?.()}
	</div>
	<div class="flex flex-col pl-4">
		<div class="text-[2rem]">
			{@render title?.()}
		</div>
		<div class="pt-4 max-w-75">
			{@render content?.()}
		</div>
	</div>
</div>
