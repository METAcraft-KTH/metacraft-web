<!-- same function as $lib/widgets/PageCard in legacy site -->
<script lang="ts">
	export let post = false;

	let classes = !post
		? 'rd-lg'
		: 'rd-b-lg md:p-20 pt-0 md:pt-0';
</script>
<main class="
	flex flex-col flex-items-center
	w-100% max-w-300
	p-4 md:p-10 mx-auto mb-12
	bg-white-concrete-powder
	text-base md:text-lg
	{classes}"
>

	<slot />
</main>