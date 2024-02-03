<script lang="ts">
	import 'virtual:uno.css';
	import '../reset.css';
	import '../app.css';
	import Header from '$lib/widgets/layout/Header.svelte';
	import Footer from '$lib/widgets/layout/Footer.svelte';
</script>

<div class="h-full flex flex-col">
	<Header />
	<slot />
	<Footer />
</div>
