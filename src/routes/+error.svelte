<script lang="ts">
  import enchantedBook from '$lib/images/items/enchanted_book.gif';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
  import { page } from '$app/state';
  import { m } from '$lib/paraglide/messages.js';
  import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
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
  .tip :global(a) {
    color: #55ffff;
  }
  .tip {
    background: linear-gradient(#2c0a62, #180233);
    box-shadow: 0 0.15em black, 0 -0.15em black, 0.15em 0 black, -0.15em 0 black;
    padding: 0.15em;
    color: white;
  }
</style>

<Header />
<div class="w-full">
  <div id="mainSplash" class="relative flex flex-col justify-center lg:bg-fixed w-full h-[100svh] min-h-[40rem]">

    <div id="splashContent" class="flex flex-col justify-center items-center px-4 py-20 titleFadeIn">
      <div class="flex md:flex-row flex-col-reverse items-start gap-4">
        <img src={enchantedBook} alt="book" class="drop-shadow-xl max-w-[10rem] aspect-square">
        <div class="max-w-[20rem] h-max font-mc text-xl tip">
          <div class="bg-[rgba(16,0,16,0.94)] p-[0.375em]">
            <span class="text-[#FFFF55] italic">{page.status}</span>
            <br>
            <span class="text-[#AA00AA] italic">{m.error_info_pending()}
              <br>
              <br>
              <LocalizedRichText msg={m.error_discord} />
            </span>
          </div>
        </div>
      </div>
    </div>
    
    
  
  </div>
</div>


<Footer />
<!--
<Header />
  <div class="flex flex-col flex-1 items-center w-full">
    <Title>{page.status}</Title>
    <Main>
      <span class="text-xl">
        {#if page.status === 404}
          Wow, that page sure doesn't exist!
        {/if}
      </span>
    </Main>
  </div>
<Footer />
-->