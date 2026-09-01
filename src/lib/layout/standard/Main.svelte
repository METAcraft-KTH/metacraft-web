<!-- same function as $lib/widgets/PageCard in legacy site -->
<script lang="ts">
	import Button from "$lib/widgets/Button.svelte";


	interface Props {
		post?: boolean;
		bg?: string;
		text?: string;
		back_button?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		post = false,
		bg = "white-concrete-powder",
		text = "black",
		back_button = false,
		children
	}: Props = $props();

	let classes = !post
		? 'rd-lg shadow-lg'
		: 'rd-b-lg md:p-20 pt-0 md:pt-0';
</script>
{#if back_button}
<div class="hidden sm:block relative mx-auto w-full max-w-270 h-0">
	<div class="-top-2 left-0 absolute w-max">
		<a href="/smp#history" class="block bg-map ml-1 px-3 py-2 rounded font-bold text-black text-sm no-underline hover:scale-105 transition-all hover:contrast-200">
			&lt; Tillbaka
		  </a>
	</div>
</div>
{/if}
<main class="
	flex flex-col
	w-full max-w-280
	p-4 md:p-10 mx-auto mb-36
	bg-{bg} text-{text}
	text-base md:text-lg
	rounded-lg
	{classes}"
>

	{@render children?.()}
</main>