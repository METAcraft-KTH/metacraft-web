<script lang="ts">
  import enchantedBook from '$lib/images/items/enchanted_book.gif';
  import Header from '$lib/layout/Header.svelte';
  import Footer from '$lib/layout/Footer.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
</script>

<!-- ponytail: placeholder until the new Google Forms link exists; restore the meta refresh redirect then -->

<style>
  #mainSplash {
    background-image: linear-gradient(
        #46373890,
        #46373890
      ), url('$lib/images/splashes/entre.webp');
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
            <span class="text-[#FFFF55] italic">{m.sok_form_pending_title()}</span>
            <br>
            <span class="text-[#AA00AA] italic">{m.sok_form_pending_info()}
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
