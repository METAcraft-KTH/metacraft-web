<!--
	mdsvex substitutes any component exported from a layout's module context
	whose name matches an HTML tag. That is why the styling of markdown output
	lives in per-tag components here instead of in global CSS.
-->
<script lang="ts" module>
	import p from './P.svelte';
	import h1 from './H1.svelte';
	import h2 from './H2.svelte';
	import h3 from './H3.svelte';
	import ul from './Ul.svelte';
	import ol from './Ol.svelte';
	import li from './Li.svelte';
	import a from './A.svelte';
	import img from './Img.svelte';
	import blockquote from './Blockquote.svelte';
	import code from './Code.svelte';
	import pre from './Pre.svelte';
	import hr from './Hr.svelte';
	import table from './Table.svelte';

	export { p, h1, h2, h3, ul, ol, li, a, img, blockquote, code, pre, hr, table };
</script>

<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
