<svelte:head>
  <title>METAcraft</title>
</svelte:head>

<script lang="ts">
  import logo from '$lib/images/logo_big.webp';
  import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import adventurer from '$lib/images/pr_squares/adventurer.png';
	import engineer from '$lib/images/pr_squares/engineer.png';
	import trader from '$lib/images/pr_squares/trader.png';
	import warrior from '$lib/images/pr_squares/warrior.png';
	import PrRow from './PrRow.svelte';
  import ChevronDown from '$lib/icons/ChevronDown.svelte';

  const scrollDown = () => {
    let targetPx = window.innerHeight - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({top: targetPx, behavior: 'smooth'})
  }


</script>

<style>
  /* rendern läggs in här som bakgrund när den är klar */
  #mainSplash {
    background-image: linear-gradient(
        #fecdd390, 
        #fecdd390
      ), url('$lib/images/splashes/main.webp');
    background-size: cover;
    background-position: center center;
  }

  #mainSplash a.faq {
    background-image: linear-gradient(
        #fffffff0, 
        #ffffff00
      ), url('$lib/images/bg/white_concrete_powder.png');
    background-repeat: repeat;
    background-position: center center;
  }

  #gameVersion {
    border-radius: 0 0 .5rem .5rem;
  }

</style>

<div id="mainSplash" class="w-100% min-h-100svh mt--14 flex flex-col flex-justify-center lg:bg-fixed">

  <div id="splashContent" class="titleFadeIn py-20 px-4 flex flex-col flex-items-center flex-justify-center">
    <img src={logo} alt="METAcraft" class="logo my-6 max-w-600px w-100%" />

    <p class="mc10 text-3xl sm:text-4xl">SPELA NU PÅ:</p>
  
    <div class="bg-black b-white b-2 b-solid p-2 px-4 sm:w-400px text-center text-xl sm:text-2xl text-white mc7">
      mc.datasektionen.se
      <!--{$page.url.toString().replace(/https?:\/\//,'').replace(/\//,'')}-->
    </div>
  
    <div id="gameVersion" class="py-1 px-4 bg-white text-black mc7 sm:text-lg">Java 1.20.4</div>
  
    <a href="https://modrinth.com/plugin/simple-voice-chat" target="_blank" class="faq block px-4 py-3 no-underline m-t8 rd text-black font-bold shadow-lg transition-all hover:scale-105">
      Ladda ner Simple Voice Chat här!
    </a>
  </div>

  <button class="notButton absolute bottom-0 left-0 w-100% h-15 text-center color-white titleFadeIn" style="animation-delay: 1s" on:mousedown={scrollDown}>
    <ChevronDown />
  </button>
</div>




{#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
  <ActiveEvent start={new Date('2024-02-04 19:00:00')} end={new Date('2024-02-05 19:00:00')} href={'/event'}>
    SPRÄNGA KTH
  </ActiveEvent>
{/if}

<div class="mx-auto mt-12 w-100% max-w-250 p-5 rd">
  <iframe class="w-100% aspect-video" style="box-shadow: 0 0 0 .5rem white" src="https://www.youtube-nocookie.com/embed/B6CmcGmRNwE?si=FMbaRhAsolJx9YcD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>




<main class="mx-auto my-12 w-100% max-w-250 p-5 md:p-10 text-base md:text-lg shadow-xl bg-white-concrete-powder rd">
  <span class="font-bold">Välkommen till METAcraft!</span> En spännande Minecraft SMP (Survival Multiplayer) som är öppen till alla studenter vid Data- och Medieteknik-programmet på KTH. Stig in i en aktiv community med regelbundna uppdateringar av nya innehåll och event. Här finns det alltid något kul att göra oavsett din spelstil, eller om du är nybörjare eller veteran till spelet!

  <div class="my-14" />

    <PrRow imgSrc={adventurer} imgAlt={'Adventurer'}>
      <svelte:fragment slot="title">För Äventyrare</svelte:fragment>
        <p slot="text">
          Utforska världen, hitta ledtrådar och pussla ihop berättelsen bakom Borgarorden och dess
          kamp mot de onda. Delta i event och bli en del av serverns historia! Läs mer i
          <a href="/lore">Lore</a>.
        </p>
    </PrRow>

    <PrRow left={true} imgSrc={engineer} imgAlt={'Engineer'}>
      <svelte:fragment slot="title">För Ingenjörer</svelte:fragment>
        <p slot="text">
          METAcraft behåller alla viktiga detaljer i hur Minecraft fungerar, så att alla avancerade
          redstone-maskiner fungerar som de ska. Bygg mob farms, sorteringsmaskiner och automatisera
          dina resurser! Läs mer i <a href="/features#mechanics">Tekniska detaljer</a>.
        </p>
    </PrRow>

    <PrRow imgSrc={trader} imgAlt={'Trader'}>
      <svelte:fragment slot="title">För Byteshandlare</svelte:fragment>
        <p slot="text">
          Samla dyrbarheter, köp och sälj med andra spelare, och bygg ditt handelsimperium.
          METAcraft har ett enkelt shop mod som underlättar att sätta upp affärer och handla med
          andra spelare. Läs mer om <a href="/shop">Ekonomin</a>.
        </p>
    </PrRow>

    <PrRow left={true} imgSrc={warrior} imgAlt={'Warrior'}>
      <svelte:fragment slot="title">För Krigare</svelte:fragment>
        <p slot="text">
          Slåss mot andra spelare i vildmarken eller PvP-arenan, eller utrusta dig med dina
          medspelare och delta i event och besegra monster och bossar. Läs mer om
          <a href="/zones">Vildmarken</a>.
        </p>
    </PrRow>
  
</main>