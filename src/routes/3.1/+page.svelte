<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';

  import Title from "$lib/layout/standard/Title.svelte";
  import Main from '$lib/layout/standard/Main.svelte';

	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";

  import Countdown from './Countdown.svelte';
  
  import ChevronDown from '$lib/icons/ChevronDown.svelte';

  const scrollDown = () => {
    let targetPx = window.innerHeight - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({top: targetPx, behavior: 'smooth'})
  }
  
</script>

<Header splashPage={true} />

<!-- !! CUSTOM BG !! -->
<style>
	.custombg {
		background-image: url("./page_splash.webp");
	}
  .custombg2 {
		background-image: radial-gradient(
        #000000a0, 
        #000000a0
      ), url("./end_gateway.avif");
	}
  .custombg3 {
    background: linear-gradient(
        #00000000, 
        #000000f0
      );
  }
</style>
<div class="w-100lvw h-100lvh fixed z--10 bg-center-center custombg2" />

<div class="w-100% min-h-100svh pt-10 block">
  <div class="absolute top-0 left-0 w-100% h-100% bg-center-bottom bg-cover custombg z--5" />

  <Title>3.1<br>FINAL CAMPAIGN</Title>

  <Countdown />

  <button class="notButton absolute bottom-0 left-0 w-100% h-15 m-0 text-center color-white custombg3 titleFadeIn" on:mousedown={scrollDown}>
    <ChevronDown />
  </button>
</div>

<div class="mx-auto mt-12 w-100% max-w-250 p-5 mb-40 rd">
  <iframe class="w-100% aspect-video" style="box-shadow: 0 0 0 .5rem black" src="https://www.youtube-nocookie.com/embed/Uy6ZGn5OHdk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<!--<Main bg="black" text="white">
</Main>-->

<Footer />


