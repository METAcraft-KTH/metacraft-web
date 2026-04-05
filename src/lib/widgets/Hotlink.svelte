<script lang="ts">
	interface Props {
		id: string;
		title: string;
		children?: import('svelte').Snippet;
	}

	let { id, title, children }: Props = $props();
</script>

<div class="m-4 relative">
	<div {id} class="absolute top--20">&nbsp;</div> <!-- so that the hotlinks respect the header height -->
	<a href="#{id}" class="text-pink-700 hover:text-pink-900 no-underline text-xl">{title}</a>
	<div class="p-4">
		{@render children?.()}
	</div>
</div>
