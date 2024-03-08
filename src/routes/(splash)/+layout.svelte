<script lang="ts">
  import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
</script>

<Header splashPage={true} />
	<slot />
<Footer />
