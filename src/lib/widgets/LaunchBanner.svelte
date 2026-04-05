<script lang="ts">
	const launchDate = new Date('2023-12-26 19:00:00'); // 19 svensk tid

	let currentTime = $state(Date.now());

	let count = $derived(Math.max(Math.round((launchDate.getTime() - currentTime) / 1000), 0));
	let s = $derived(count % 60);
	let m = $derived(Math.floor(count / 60) % 60);
	let h = $derived(Math.floor(count / (60 * 60)) % 24);
	let d = $derived(Math.floor(count / (60 * 60 * 24)));

	function updateTimer() {
		currentTime = Date.now();
	}

	let interval = setInterval(updateTimer, 1000);
	$effect(() => {
		if (count <= 0) clearInterval(interval);
	});
</script>

<div class="flex flex-col justify-center items-center h-100%">
	<div class="bg-pink-500 m-8 p-6 b-rd-4 color-white">
		<div class="font-size-10">Lansering den 26e December!</div>
		<div class="font-size-10">
			{d}d {h}h {m}m {s}s
		</div>
	</div>
</div>
