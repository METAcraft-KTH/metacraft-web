<!-- same function as $lib/widgets/PageCard in legacy site -->
<script lang="ts">
	import Button from "$lib/widgets/Button.svelte";

	export let post = false;
	export let bg = "white-concrete-powder";
	export let text = "black";

	export let back_button = false;

	let classes = !post
		? 'rd-lg shadow-lg'
		: 'rd-b-lg md:p-20 pt-0 md:pt-0';
</script>
{#if back_button}
<div class="relative h-0 mx-auto w-100% max-w-270 hidden sm:block">
	<div class="absolute top--2 left-0 w-max">
		<a href="/smp#history" class="bg-map block px-3 py-2 ml-1 no-underline rd text-black text-sm font-bold transition-all hover:scale-105 hover:contrast-200">
			&lt; Tillbaka
		  </a>
	</div>
</div>
{/if}
<main class="
	flex flex-col
	w-100% max-w-280
	p-4 md:p-10 mx-auto mb-36
	bg-{bg} text-{text}
	text-base md:text-lg
	{classes}"
>

	<slot />
</main>