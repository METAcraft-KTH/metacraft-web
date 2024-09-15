<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
  import { page } from '$app/stores';
</script>

<style>
  /* rendern läggs in här som bakgrund när den är klar */
  #mainSplash {
    background-image: linear-gradient(
        #46373890, 
        #46373890
      ), url('$lib/images/splashes/hamn.webp');
    background-size: cover;
    background-position: center center;
  }
  .tip {
    background: linear-gradient(#2c0a62, #180233);
    box-shadow: 0 0.15em black, 0 -0.15em black, 0.15em 0 black, -0.15em 0 black;
    padding: 0.15em;
    color: white;
  }
</style>

<Header />
<div class="w-100%">
  <div id="mainSplash" class="flex flex-col flex-justify-center w-100% h-100svh min-h-[40rem] lg:bg-fixed relative">

    <div id="splashContent" class="titleFadeIn py-20 px-4 flex flex-col flex-items-center flex-justify-center">
      <div class="flex flex-col-reverse md:flex-row gap-4">
        <img src="https://minecraft.wiki/images/Enchanted_Book.gif" alt="book" class="drop-shadow-xl max-w-[10rem]">
        <div class="h-max tip mc7 text-xl max-w-[20rem]">
          <div class="bg-[rgba(16,0,16,0.94)] p-0.375em">
            <span class="text-#FFFF55 italic">{$page.status}</span>
            <br>
            <span class="text-#AA00AA italic">Informationen du söker kommer uppenbara sig i en snar framtid.</span>
          </div>
        </div>
      </div>
    </div>
    
    
  
  </div>
</div>


<Footer />
<!--
<Header />
  <div class="flex-1 flex flex-col flex-items-center w-100%">
    <Title>{$page.status}</Title>
    <Main>
      <span class="text-xl">
        {#if $page.status === 404}
          Wow, that page sure doesn't exist!
        {/if}
      </span>
    </Main>
  </div>
<Footer />
-->