<script lang="ts">
	import 'virtual:uno.css';
	import '../reset.css';
	import '../app.css';
	import TopBar from '$lib/widgets/TopBar.svelte';
</script>

<div class="h-full">
	<TopBar />
	<slot />
</div>
