<script lang="ts">
	interface Props {
		href: string;
		title?: string;
		children?: import('svelte').Snippet;
	}

	let { href, title, children }: Props = $props();

	// same rule as LocalizedRichText: external links open in a new tab
	let external = $derived(href.startsWith('http'));
</script>

<a {href} {title} target={external ? '_blank' : undefined}>{@render children?.()}</a>
