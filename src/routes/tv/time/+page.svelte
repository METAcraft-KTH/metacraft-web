<script lang="ts">
    import splash from '$lib/images/splashes/borgargarden.webp'
	import Countdown from './Countdown.svelte';
    import logo from '$lib/images/logo_big.webp'
</script>

<div class="w-screen h-screen bg-cover flex flex-col gap-4rem justify-center items-center" style={`background-image: url(${splash})`}>
    <img src={logo} alt="logo">
    <Countdown />
</div>