<script lang="ts">
	interface Props {
		src: string;
		alt?: string;
		title?: string;
	}

	import { resolveImage } from './images';

	let { src, alt = '', title }: Props = $props();

	let url = $derived(resolveImage(src));
</script>

<!-- title text doubles as a caption, matching how posts label recipe images -->
<figure class="mb-6">
	<img src={url} {alt} class="mx-auto max-w-full" />
	{#if title}
		<figcaption class="mt-2 text-neutral-500 text-sm text-center italic">{title}</figcaption>
	{/if}
</figure>
