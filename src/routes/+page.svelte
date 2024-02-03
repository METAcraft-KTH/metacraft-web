<svelte:head>
  <title>METAcraft</title>
</svelte:head>

<script lang="ts">
  import logo from '$lib/images/logo_big.png';
  import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import adventurer from '$lib/images/pr_squares/adventurer.png';
	import engineer from '$lib/images/pr_squares/engineer.png';
	import trader from '$lib/images/pr_squares/trader.png';
	import warrior from '$lib/images/pr_squares/warrior.png';
	import H1 from '$lib/textstyles/H1.svelte';
</script>

<style>
  /* rendern läggs in här som bakgrund när den är klar */

  /*#mainSplash {
    background-image: linear-gradient(
        #fecdd390, 
        #fecdd390
      ), url('src/lib/images/background2.png');
    background-size: cover;
    background-position: center center;
  }*/

  #mainSplash a.faq {
    background-image: linear-gradient(
        #fffffff0, 
        #ffffff00
      ), url('src/lib/images/bg/white_concrete_powder.png');
    background-repeat: repeat;
    background-position: center center;
  }
  section {
    background-image: linear-gradient(
        #ffffffe0, 
        #ffffff60,
        #ffffffe0
      ), url('src/lib/images/bg/white_concrete_powder.png');
    background-repeat: repeat;
    background-position: center center;
  }

  #gameVersion {
    border-radius: 0 0 .5rem .5rem;
  }
</style>

<div id="mainSplash" class="w-100% py-26 h-100vh flex flex-col justify-center flex-items-center">

  <img src={logo} alt="METAcraft" class="logo p-8 max-w-600px w-90%" />

  <p class="mc10 text-3xl sm:text-4xl">SPELA NU PÅ:</p>

  <div class="bg-black b-white b-2 b-solid p-2 px-4 sm:w-400px text-center text-xl sm:text-2xl text-white mc7">
    mc.datasektionen.se
    <!--{$page.url.toString().replace(/https?:\/\//,'').replace(/\//,'')}-->
  </div>

  <div id="gameVersion" class="py-1 px-4 bg-white text-black mc7 sm:text-lg">Java 1.20.4</div>

  <a href="/faq#login" class="faq block px-6 py-2 no-underline m-t8 rd text-black font-bold text-lg shadow-lg transition-all hover:scale-105">
    Problem med inloggning?
  </a>
</div>


{#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
  <ActiveEvent start={new Date('2024-02-04 19:00:00')} end={new Date('2024-02-05 19:00:00')} href={'/events'}>
    SPRÄNGA KTH
  </ActiveEvent>
{/if}


<section class="mx-auto w-100% max-w-1000px p-10 text-lg rd shadow-xl">
  <span class="font-bold">Välkommen till METAcraft!</span> En Minecraft-server som är öppen till alla studenter på Data- och Medieteknikprogrammet vid KTH. Oavsett om du är en nybörjare eller en Minecraft-veteran så finns det alltid något kul att göra!

  <div class="my-12" />

  <!-- TODO: make these into widgets later for better readability -->

  <div class="relative mb-6 flex flex-row flex-justify-center flex-items-center">
    <span>
      <h2 class="mb-2 text-3xl">För Äventyrare</h2>
      <p>
        Utforska världen, hitta ledtrådar och pussla ihop berättelsen bakom borgarorden och dess
        kamp mot de onda. Delta i event och bli en del av serverns historia! Läs mer i
        <a href="/lore">Lore</a>.
      </p>
    </span>
    <img src={adventurer} alt="Adventurer" class="relative h-150px sm:h-200px md:h-250px right--4 xl:right--16 top-0 b-white b-4 b-solid shadow-2xl rotate-2" />
  </div>

  <div class="relative mb-6 flex flex-row flex-justify-center flex-items-center">
    <img src={engineer} alt="Engineer" class="relative h-150px sm:h-200px md:h-250px left--4 xl:left--16 top-0 b-white b-4 b-solid shadow-2xl rotate--2" />
    <span>
      <h2 class="mb-2 text-3xl">För Ingenjörer</h2>
      <p>
        METAcraft behåller alla viktiga detaljer i hur Minecraft fungerar, så att alla avancerade
        redstone-maskiner fungerar som de ska. Bygg mob farms, sorteringsmaskiner och automatisera
        dina resurser! Läs mer i <a href="/features#mechanics">Tekniska detaljer</a>.
      </p>
    </span>
  </div>

  <div class="relative mb-6 flex flex-row flex-justify-center flex-items-center">
    <span>
      <h2 class="mb-2 text-3xl">För Byteshandlare</h2>
      <p>
        Samla dyrbarheter, köp och sälj med andra spelare, och bygg ditt handelsimperium.
        METAcraft har ett enkelt shop mod som underlättar att sätta upp affärer och handla med
        andra spelare. Läs mer om <a href="/shop">Ekonomin</a>.
      </p>
    </span>
    <img src={trader} alt="Trader" class="relative h-150px sm:h-200px md:h-250px right--4 xl:right--16 top-0 b-white b-4 b-solid shadow-2xl rotate-2" />
  </div>

  <div class="relative mb-6 flex flex-row flex-justify-center flex-items-center">
    <img src={warrior} alt="Warrior" class="relative h-150px sm:h-200px md:h-250px left--4 xl:left--16 top-0 b-white b-4 b-solid shadow-2xl rotate--2" />
    <span>
      <h2 class="mb-2 text-3xl">För Krigare</h2>
      <p>
        Slåss mot andra spelare i vildmarken eller PvP-arenan, eller utrusta dig med dina
        medspelare och delta i event och besegra monster och bossar. Läs mer om
        <a href="/zones">Vildmarken</a>.
      </p>
    </span>
  </div>
  
</section>