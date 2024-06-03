<!-- same function as $lib/widgets/PageCard in legacy site -->
<script lang="ts">
	export let post = false;
	export let bg = "white-concrete-powder";
	export let text = "black";

	let classes = !post
		? 'rd-lg shadow-lg'
		: 'rd-b-lg md:p-20 pt-0 md:pt-0';
</script>
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