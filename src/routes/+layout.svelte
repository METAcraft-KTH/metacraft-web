<script lang="ts">
	import 'virtual:uno.css';
	import '../reset.css';
	import '../app.css';
	import TopBar from '$lib/widgets/TopBar.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
</script>

<div class="h-full flex flex-col">
	<TopBar />
	<slot />
	<div style="text-align: center; margin-top: 2em;">
		<a href="/gdpr">GDPR Statement</a>
	</div>
</div>
