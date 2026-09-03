<script lang="ts">
  import Seo from '$lib/Seo.svelte';
  import bambooSign from '$lib/images/bg/blank_sign_bamboo.png';
  import commandBlockIcon from '$lib/images/items/impulse_command_block.png';
  import logo from '$lib/images/logo_big.webp';
  import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import adventurer from '$lib/images/pr_squares/adventurer.png';
	import engineer from '$lib/images/pr_squares/engineer.png';
	import trader from '$lib/images/pr_squares/trader.png';
	import warrior from '$lib/images/pr_squares/warrior.png';
  import survival from '$lib/images/pr_squares/survival.png';
  import pvp from '$lib/images/pr_squares/pvp.png';
  import campus from '$lib/images/pr_squares/campus.png';
  import hands from '$lib/images/pr_squares/holdinghands.png';
  import vcrender from '$lib/images/pr_squares/voicechat-render.png';
  import spyglass from '$lib/images/pr_squares/spyglass.png';
	import PrRow from './PrRow.svelte';
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import GameSquare from './GameSquare.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';

  const scrollDown = () => {
    let targetPx = window.innerHeight - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({top: targetPx, behavior: 'smooth'})
  }


</script>

<Seo bare />

<style>
  /* rendern läggs in här som bakgrund när den är klar */
  #mainSplash {
    background-image: linear-gradient(
        #46373890, 
        #46373890
      ), url('$lib/images/splashes/borgargarden.webp');
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

  .abcabc {
    background-image: url('$lib/images/background-s4-water.png');
  }

  #gameVersion {
    border-radius: 0 0 .5rem .5rem;
  }

</style>

<div id="mainSplash" class="relative flex flex-col justify-center lg:bg-fixed -mt-14 w-full h-svh min-h-160">

  <div id="splashContent" class="flex flex-col justify-center items-center px-0 py-20 titleFadeIn">
    <p class="text-shadow-lg font-ten text-white text-3xl sm:text-4xl text-center">{m.home_welcome()}</p>

    <img src={logo} alt="METAcraft" class="my-6 w-full max-w-[600px] logo" />

    <p class="text-shadow-lg font-ten text-white text-3xl sm:text-4xl text-center">{m.home_kth_community()}</p>

    {#if false}
      <div class="bg-black p-2 px-4 border-2 border-white border-solid sm:w-[400px] font-mc text-white text-xl sm:text-2xl text-center">
        mc.datasektionen.se
        <!--{$page.url.toString().replace(/https?:\/\//,'').replace(/\//,'')}-->
      </div>

      <div id="gameVersion" class="bg-white px-4 py-1 font-mc text-black sm:text-lg">Java 1.20.6</div>
    {/if}

    <div class="flex md:flex-row flex-col justify-center items-center gap-4 mt-4 sm:mt-0 text-center">
      <a href="/smp" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
        {m.home_start_playing_cta()}
      </a>
      <a href="https://discord.com/invite/MttUbkmeyD" target="_blank" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
        {m.home_join_discord_cta()}
      </a>
    </div>

    {#if false}
    <div style="border-image: url('{bambooSign}') 2 fill round;" class="hidden md:block mt-12 p-8 max-w-200 font-mc font-bold text-center">
      <p class="mb-2">SERVER LAUNCH:</p>
      <p class="font-ten text-4xl">{m.home_launch_date()}</p>
    </div>
    {/if}

    <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
    {#if false}
    <ActiveEvent start={new Date('2025-10-27 20:00:00')} end={new Date('2025-10-27 21:00:00')} countdown={true} href={'/smp'}>
      SERVER LAUNCH
    </ActiveEvent>
    {/if}
    
  </div>

  <button class="bottom-0 left-0 absolute flex justify-center w-full h-15 text-white text-center notButton titleFadeIn" style="animation-delay: 1s" onmousedown={scrollDown}>
    <ChevronDown />
  </button>
</div>






<div class="bg-cover bg-center bg-fixed w-full abcabc">
  <div class="flex flex-col items-center gap-4 md:gap-8 backdrop-blur px-2 py-12 w-full h-full">
    <div class="bg-white-concrete-powder shadow-2xl p-2 rounded w-full max-w-250">
      <iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/5KnJjiPfZQg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <span class="inline bg-white shadow-xl px-3 py-2 rounded font-ten text-black text-4xl md:text-5xl text-center">
      {m.home_this_is_metacraft()}
    </span>

    <div class="bg-white-concrete-powder shadow-xl px-2 py-6 rounded max-w-200 text-black text-lg text-center leading-tight">
      {m.home_intro()}
    </div>

  </div>
</div>

<div class="flex flex-col items-center gap-4 md:gap-8 bg-dark-oak-planks px-2 py-12 w-full leading-tight">

  <div class="inline drop-shadow-xl px-2 rounded font-ten text-white text-4xl md:text-5xl text-center">
    <LocalizedRichText msg={m.home_play_your_way} />
  </div>
  <p class="max-w-200 text-white text-center">
    {m.home_three_parts()}
  </p>
  <div class="flex md:flex-row flex-col gap-6">
    <GameSquare img={survival} title={m.smp_title()} link="/smp">{m.home_gamesquare_survival()}</GameSquare>
    <GameSquare img={campus} title={m.campus_title()} link="/campus">{m.home_gamesquare_campus()}</GameSquare>
    <GameSquare img={pvp} title={m.event_title()} link="/event">{m.home_gamesquare_pvp()}</GameSquare>
  </div>

  <!--
  <div style="border-image: url('{bambooSign}') 2 fill round;" class="md:hidden block mx-4 mt-12 p-8 max-w-200 font-mc font-bold text-center">
    <p class="mb-2">SERVER LAUNCH:</p>
    <p class="font-ten text-4xl">måndag 23 september</p>
  </div>

  <main class="bg-map shadow-xl mx-2 my-12 p-8 md:p-10 w-full max-w-250 text-base md:text-lg">
    <span class="font-bold">Välkommen till METAcraft!</span>
  
    <div class="my-14" />
  
      <PrRow imgSrc={survival} imgAlt={'Survival'}>
        <svelte:fragment slot="title">Survival</svelte:fragment>
          <p slot="text">
            En vanlig multiplayer-upplevelse i en ovanlig värld, fylld av främmande miljöer och fornlämningar för dig att utforska. Hjälp drottning Quristina att kartlägga världen, och hitta alla ledtrådar och skatter den gömmer. Styr berättelsens gång genom din insats och bli en del av serverns levande historia!
          </p>
      </PrRow>
  
      <PrRow left={true} imgSrc={pvp} imgAlt={'pvp'}>
        <svelte:fragment slot="title">Tävlingar</svelte:fragment>
          <p slot="text">
            Minst två gånger per termin anordnas minispelturneringar av professionell kvalitet, där man kan vinna sjuka priser både som individ och lag! Utöver dessa finns det också många andra event under läsårets gång. Inga av dessa kräver registrering: det är bara att dyka upp och spela.
          </p>
      </PrRow>
  
      <PrRow imgSrc={campus} imgAlt={'Campus'}>
        <svelte:fragment slot="title">Bygga campus</svelte:fragment>
          <p slot="text">
            Har du någonsin velat springa runt på KTH Campus i Minecraft? Tidigare var det omöjligt, men i år kommer det att förändras med hjälp av alla studenter. Vi använder oss av planritningar och tjänster som Google Earth och Maps för att säkerställa att vår återskapelse är så skalenlig som möjligt.
          </p>
      </PrRow>
    
  </main>
  -->

  <div class="flex md:flex-row flex-col items-center gap-10 px-6 py-12 max-w-[70rem] text-white">
    <div class="flex flex-col justify-center items-center md:items-start gap-3">
      <h1 class="font-ten text-4xl md:text-5xl md:text-left text-center"><LocalizedRichText msg={m.home_flex} /></h1>
      <p class="md:text-left text-center leading-tight">{m.home_flex_body()}</p>
      <a href="/style" class="inline-block bg-map shadow-xl md:mt-2 px-4 py-3 w-max font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
        {m.home_flex_cta()}
      </a>
    </div>
    <img src={hands} alt="holding hands" class="drop-shadow-xl px-3 w-full max-w-[25rem]">
  </div>

  <div class="flex md:flex-row flex-col items-center gap-10 px-6 py-12 max-w-[70rem] text-white">
    <img src={vcrender} alt="holding hands" class="drop-shadow-xl px-3 w-full max-w-[30rem]">
    <div class="flex flex-col justify-center items-center md:items-start gap-3">
      <h1 class="font-ten text-4xl md:text-5xl md:text-left text-center">Proximity voice chat</h1>
      <p class="md:text-left text-center leading-tight"><LocalizedRichText msg={m.home_vc_pre} /></p>
      <a href="/install" class="inline-block bg-map shadow-xl md:mt-2 px-4 py-3 w-max font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
        {m.home_vc_cta()}
      </a>
    </div>
  </div>


  <div class="flex flex-col items-center gap-4 mx-2 mb-12 md:p-10 w-full max-w-[50rem] text-base">
    <h1 class="font-ten text-white text-4xl md:text-5xl text-center">{m.home_help_us_title()}</h1>
    <a href="/sok" target="_blank" class="inline-block bg-map p-4 hover:scale-105 transition-all hover:contrast-120"><img src={spyglass} alt={m.home_spyglass_alt()} class="sepia-50 w-full max-w-[25rem]"></a>

    <p class="px-5 text-white text-center leading-tight"><LocalizedRichText msg={m.home_help_us_pre} /></p>

    <a href="/sok" target="_blank" class="inline-block bg-map shadow-xl md:mt-2 px-4 py-3 w-max font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
      {m.home_help_us_cta()}
    </a>
  </div>

  <!--<div class="flex sm:flex-row flex-col">
    <img src={commandBlockIcon} alt="command block" class="flex-1 max-w-[8rem] aspect-square">
    <div>

    </div>
  </div>-->


</div>

