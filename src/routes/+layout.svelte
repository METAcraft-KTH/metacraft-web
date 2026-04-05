<script lang="ts">
	import 'virtual:uno.css';
	import '../reset.css';
	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="h-full flex flex-col flex-items-center">
	{@render children?.()}
</div>