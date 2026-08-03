<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="
	flex flex-col items-center
	max-w-250
	p-4 md:p-6 mx-auto mb-12
	bg-white-concrete-powder
	text-base text-center md:text-lg rounded-lg shadow-lg"
>

	{@render children?.()}
</div>