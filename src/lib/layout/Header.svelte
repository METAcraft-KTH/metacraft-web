<script lang="ts">
	import MobileHeader from './mobile/MobileHeader.svelte';
	import DesktopHeader from './desktop/DesktopHeader.svelte';

	interface Props {
		splashPage?: boolean; // endast sant i routes/(splash)/+layout.svelte
	}

	let { splashPage = false }: Props = $props();

	let scrollY: number = $state(0);
	let hideHeader = $state(true);
	$effect(() => {
		hideHeader = !(scrollY > 0) && splashPage;
	}); // om sant, göm headerns bakgrund när scroll är på toppen av sidan
</script>
<svelte:window bind:scrollY={scrollY} />

<!-- mobile -->
<nav class="md:hidden z-99 w-100%">
	<MobileHeader {hideHeader} />
</nav>

<!-- not mobile -->
<nav class="hidden z-99 md:flex w-100%">
	<DesktopHeader {hideHeader} />
</nav>

<!--Spacer-->
<div class="mb-14"></div>