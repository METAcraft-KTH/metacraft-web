<script lang="ts">
    import splash from '$lib/images/splashes/borgargarden.webp'
	import Countdown from './Countdown.svelte';
    import logo from '$lib/images/logo_big.webp'
</script>

<div class="w-screen h-screen bg-cover flex flex-col gap-5vh justify-center items-center" style={`background-image: url(${splash})`}>
    <div class="aspect-3 h-40vh flex justify-center">
        <img src={logo} alt="logo" class="mx-auto">
    </div>
    <Countdown />
</div>