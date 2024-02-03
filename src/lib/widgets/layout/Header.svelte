<script lang="ts">
	import MobileHeader from './mobile/MobileHeader.svelte';
	import DesktopHeader from './desktop/DesktopHeader.svelte';
</script>

<!-- mobile -->
<nav class="md:hidden w-100% z-99">
	<MobileHeader />
	<div class="mb-16" />
</nav>

<!-- not mobile -->
<nav class="hidden md:flex w-100% z-99">
	<DesktopHeader />
	<div class="mb-14" />
</nav>
<!--Spacer-->
