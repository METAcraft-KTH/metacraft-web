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

  #gameVersion {
    border-radius: 0 0 .5rem .5rem;
  }

</style>

<div id="mainSplash" class="w-100% min-h-100svh mt--14 flex flex-col flex-justify-center lg:bg-fixed">

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

{#if false}
<div class="mx-auto mt-12 w-100% max-w-250 p-5 rd">
  <iframe class="w-100% aspect-video" style="box-shadow: 0 0 0 .5rem white" src="https://www.youtube-nocookie.com/embed/B6CmcGmRNwE?si=FMbaRhAsolJx9YcD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
{/if}


<div class="w-100% bg-dark-oak-planks flex flex-col items-center">

  <div style="border-image: url('https://minecraft.wiki/images/Blank-sign-bamboo_JE1_BE1.png') 2 fill round;" class="mc7 max-w-200 mt-12 mx-4 p-8 font-bold text-center block md:hidden">
    <p class="mb-2">SERVER LAUNCH:</p>
    <p class="text-4xl mc10">måndag 23 september</p>
  </div>

  <main class="mx-2 my-12 w-100% max-w-250 p-5 md:p-10 text-base md:text-lg shadow-xl bg-map">
    <span class="font-bold">Välkommen till METAcraft!</span> Ett aktivt Minecraft-gemenskap som är i första hand riktad till studenter vid Data- och Medieteknikprogrammet. Stig in i en aktiv community med regelbundna uppdateringar av nya innehåll och spännande event. Här finns det alltid något kul att göra oavsett din spelstil, eller om du är nybörjare eller veteran i spelet!
  
    <div class="my-14" />
  
      <PrRow imgSrc={survival} imgAlt={'Survival'}>
        <svelte:fragment slot="title">Survival</svelte:fragment>
          <p slot="text">
            En vanlig SMP (survival multiplayer)-upplevelse i en ovanlig värld, med mängder av främmande biomer och strukturer för dig att utforska. Hjälp drottning Quristina att kartlägga världen, och hitta alla skatter och ledtrådar den gömmer. Bli en del av serverns levande historia och styr berättelsens gång genom din insats!
          </p>
      </PrRow>
  
      <PrRow left={true} imgSrc={pvp} imgAlt={'pvp'}>
        <svelte:fragment slot="title">Tävlingar</svelte:fragment>
          <p slot="text">
            Minst två gånger per termin anordnas minispelturneringar med professionell kvalité, där man kan vinna coola priser både som individ och lag! Utöver dessa finns det också många andra event under läsårets gång. Inga av dessa kräver tidsinvesteringar eller registrering: det är bara att dyka upp och spela.
          </p>
      </PrRow>
  
      <PrRow imgSrc={campus} imgAlt={'Campus'}>
        <svelte:fragment slot="title">Bygga campus</svelte:fragment>
          <p slot="text">
            Har du någonsin velat springa runt på KTH Campus i Minecraft? Tidigare var det omöjligt, men i år kommer det förändras med hjälp av alla studenter. Vi använder oss av planritningar och Google Maps för att säkerställa att vår återskapelse är så skalenligt som möjligt.
          </p>
      </PrRow>
    
  </main>

  <img src={hands} alt="holding hands" class="w-100% max-w-40rem my-6">

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

