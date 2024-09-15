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
  import survival from '$lib/images/pr_squares/survival.png';
  import pvp from '$lib/images/pr_squares/pvp.png';
  import campus from '$lib/images/pr_squares/campus.png';
  import hands from '$lib/images/pr_squares/holdinghands.png';
  import spyglass from '$lib/images/pr_squares/spyglass.png';
	import PrRow from './PrRow.svelte';
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import GameSquare from './GameSquare.svelte';

  const scrollDown = () => {
    let targetPx = window.innerHeight - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({top: targetPx, behavior: 'smooth'})
  }


</script>

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

<div id="mainSplash" class="flex flex-col flex-justify-center w-100% h-100svh min-h-[40rem] mt--14 lg:bg-fixed relative">

  <div id="splashContent" class="titleFadeIn py-20 px-4 flex flex-col flex-items-center flex-justify-center">
    <p class="mc10 text-3xl sm:text-4xl text-white text-shadow-xl text-center">Välkommen till</p>

    <img src={logo} alt="METAcraft" class="logo my-6 max-w-600px w-100%" />

    <p class="mc10 text-3xl sm:text-4xl text-white text-shadow-xl text-center">KTH:s största Minecraft-gemenskap</p>
  
    {#if false}
      <div class="bg-black b-white b-2 b-solid p-2 px-4 sm:w-400px text-center text-xl sm:text-2xl text-white mc7">
        mc.datasektionen.se
        <!--{$page.url.toString().replace(/https?:\/\//,'').replace(/\//,'')}-->
      </div>
    
      <div id="gameVersion" class="py-1 px-4 bg-white text-black mc7 sm:text-lg">Java 1.20.6</div>
    {/if}
    
    <div class="flex flex-col md:flex-row gap-4 text-center mt-4 sm:mt-0 justify-center items-center">
      <a href="https://forms.gle/upmdop1XPzrvvuS78" target="_blank" class="bg-map block px-4 py-3 no-underline md:m-t8 rd text-black font-bold text-lg shadow-xl transition-all hover:scale-105 hover:contrast-200">
        Hjälp till i projektgruppen!
      </a>
      <a href="https://discord.com/invite/MttUbkmeyD" target="_blank" class="bg-map block px-4 py-3 no-underline md:m-t8 rd text-black font-bold text-lg shadow-xl transition-all hover:scale-105 hover:contrast-200">
        Gå med i Discord-servern!
      </a>
    </div>

    <div style="border-image: url('https://minecraft.wiki/images/Blank-sign-bamboo_JE1_BE1.png') 2 fill round;" class="mc7 max-w-200 mt-12 p-8 font-bold text-center hidden md:block">
      <p class="mb-2">SERVER LAUNCH:</p>
      <p class="text-4xl mc10">måndag 23 september</p>
    </div>
  </div>

  <button class="notButton absolute bottom-0 left-0 w-100% h-15 text-center color-white titleFadeIn" style="animation-delay: 1s" on:mousedown={scrollDown}>
    <ChevronDown />
  </button>
</div>




{#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
  <ActiveEvent start={new Date('2024-06-09 19:00:00')} end={new Date('2024-06-09 21:00:00')} href={'/3.1'}>
    FINAL CAMPAIGN
  </ActiveEvent>
{/if}


<div class="w-100% bg-center-center bg-cover abcabc bg-fixed">
  <div class="w-100% h-100% py-12 px-2 backdrop-blur flex flex-col items-center gap-4 md:gap-8">
    <div class="w-100% max-w-250 bg-white-concrete-powder rd p-2 shadow-2xl">
      <iframe class="w-100% aspect-video" src="https://www.youtube-nocookie.com/embed/NA7sBWemTfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <span class="mc10 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd">
      DET HÄR ÄR METACRAFT
    </span>

    <div class="rd bg-white-concrete-powder text-black px-2 py-6 text-lg leading-tight text-center shadow-xl max-w-[50rem]">
      Vi är en Minecraft-gemenskap som i första hand är riktad till studenter vid programmen Data- och Medieteknik på KTH. Stig in i en aktiv community med spännande event och regelbundna uppdateringar med nytt innehåll. Här finns det alltid någonting kul att göra — oavsett din spelstil och erfarenhet!
    </div>

  </div>
</div>

<div class="w-100% bg-dark-oak-planks flex flex-col items-center py-12 px-2 gap-4 md:gap-8 leading-tight">

  <div class="mc10 inline text-white text-4xl md:text-5xl px-2 text-center drop-shadow-xl rd">
    SPELA PÅ <u>DITT SÄTT</u>
  </div>
  <p class="text-center text-white max-w-[50rem]">
    METAcraft består av tre delar, alla tre lika fantastiska och producerade med kärlek. Klicka nedan för att läsa mer om dem!
  </p>
  <div class="flex flex-col md:flex-row gap-6">
    <GameSquare img={survival} title="SURVIVAL" link="/smp">En vanlig multiplayer-upplevelse i en ovanlig värld!</GameSquare>
    <GameSquare img={campus} title="BYGGA CAMPUS" link="/campus">Återskapa KTH Campus i Minecraft!</GameSquare>
    <GameSquare img={pvp} title="TÄVLINGAR" link="/event">Tävla med & mot dina kamrater i spännande turneringar och andra event!</GameSquare>
  </div>

  <!--
  <div style="border-image: url('https://minecraft.wiki/images/Blank-sign-bamboo_JE1_BE1.png') 2 fill round;" class="mc7 max-w-200 mt-12 mx-4 p-8 font-bold text-center block md:hidden">
    <p class="mb-2">SERVER LAUNCH:</p>
    <p class="text-4xl mc10">måndag 23 september</p>
  </div>

  <main class="mx-2 my-12 w-100% max-w-250 p-8 md:p-10 text-base md:text-lg shadow-xl bg-map">
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

  <div class="flex flex-col md:flex-row items-center text-white max-w-[70rem] px-6 py-12 gap-10">
    <div class="flex flex-col justify-center items-center md:items-start gap-3">
      <h1 class="text-center md:text-left mc10 text-4xl md:text-5xl"><u>Flexa</u> din sektion</h1>
      <p class="text-center md:text-left">...och ta med dig METAcraft vart du än går! Klä på dig ditt sektionsplagg och representera din sektion, oavsett vilken server du spelar på. Ladda ner det officiella cerise-resurspaketet för att lägga till färgen cerise i ditt spel, precis som på Survivalservern! Allt dessa finns gratis att hämta på hemsidan.</p>
      <a href="/style" class="bg-map inline-block px-4 py-3 w-max no-underline md:mt-2 text-black font-bold text-lg shadow-xl transition-all hover:scale-105 hover:contrast-200">
        Kika in kollektionen
      </a>
    </div>
    <img src={hands} alt="holding hands" class="max-w-25rem drop-shadow-xl">
  </div>

  <main class="mx-2 my-12 w-100% max-w-40rem p-7 md:p-10 text-base md:text-lg shadow-xl bg-map flex flex-col items-center gap-4">
    <div class="font-bold text-xl sm:text-2xl mc7 text-center underline underline-3">HJÄLP EFTERLYSES!!!</div>
    <img src={spyglass} alt="kikare" class="w-100% max-w-25rem sepia-80">
    <div>Om någon av de ovannämnda aktiviteterna låter intressant för dig, tveka inte att <a href="https://forms.gle/upmdop1XPzrvvuS78" target="_blank" class="underline">söka till METAcraft-teamet idag!</a> Tillsammans kan vi förfina och förverkliga visionen, och göra spelupplevelsen så bra som möjligt!</div>
  </main>

  <!--<div class="flex flex-col sm:flex-row">
    <img src="https://minecraft.wiki/images/Impulse_Command_Block_JE5_BE2.png" alt="command block" class="aspect-square max-w-8rem flex-1">
    <div>

    </div>
  </div>-->


</div>

