<script lang="ts">
	import { run } from 'svelte/legacy';

	import MobileHeader from './mobile/MobileHeader.svelte';
	import DesktopHeader from './desktop/DesktopHeader.svelte';

	interface Props {
		splashPage?: boolean; // endast sant i routes/(splash)/+layout.svelte
	}

	let { splashPage = false }: Props = $props();

	let scrollY: number = $state();
	let hideHeader = $state(true);
	run(() => {
		hideHeader = !(scrollY > 0) && splashPage;
	}); // om sant, göm headerns bakgrund när scroll är på toppen av sidan
</script>
<svelte:window bind:scrollY={scrollY} />

<!-- mobile -->
<nav class="md:hidden w-100% z-99">
	<MobileHeader {hideHeader} />
</nav>

<!-- not mobile -->
<nav class="hidden md:flex w-100% z-99">
	<DesktopHeader {hideHeader} />
</nav>

<!--Spacer-->
<div class="mb-14"></div>