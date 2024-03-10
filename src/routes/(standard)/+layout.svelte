<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
</script>


<Header />
<div class="flex-1 w-100% flex flex-col flex-items-center">
	<slot />
</div>
<Footer />
