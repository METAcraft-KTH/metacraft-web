<script lang="ts">
  import { page } from '$app/state';
  import { slide } from 'svelte/transition';

  import Splash from "$lib/layout/standard/Splash.svelte";
  import Main from "$lib/layout/standard/Main.svelte";
  import Title from "$lib/layout/standard/Title.svelte";

  import d10 from "./10_v3.png";
  import d4 from "./4_sv.jpg";
  import d3 from "./3daysleft.png";
  import d2 from "./2daysleft.png";
  import dlaunch from "./metacraftlaunch_data.png";

	import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";

  let post = true;

  let pageNumber = $state(4);

  $effect(() => {
    if (page.url.hash) pageNumber = parseInt(page.url.hash);
  });
</script>

<link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

<Header splashPage={true} />

<!-- !! CUSTOM BG !! -->
<style>
	.custombg {
		background-image: radial-gradient(
        #271f1f70, 
        #271f1ff0
      ), url("$lib/images/splashes/main.webp")
	}

  .mono {
    font-family: "Courier Prime", monospace;
  }
</style>
<div class="z--10 fixed bg-cover bg-center-center w-100lvw h-100lvh custombg"></div>
<!-- !! CUSTOM BG !! -->

<!-- TODO: gör det här elementet till en layout? -->

  <Title>3.0<br>GRAND OPENING</Title>

  <!--
  <p class="shadow-lg font-bold text-white text-2xl">SPELA NU!</p>
  <div class="bg-black shadow-lg mb-3 px-3 py-1 text-white text-xl md:text-2xl text-center b-white b-2 b-solid mc7">
    mc.datasektionen.se
  </div>
  -->

  <div class="flex flex-row gap-1 px-2 w-100% max-w-200 h-8 md:h-16 text-bold text-green text-xl md:text-3xl">
    <button class="flex justify-center items-center bg-black w-8 md:w-16 h-100% text-white text-3xl md:text-5xl cursor-pointer b-green hover:b-white b-solid mono" onclick={() => {pageNumber--; if (pageNumber < 0) pageNumber = 4}}>
      {#if pageNumber > 0}←{/if}
    </button>
    <div class="flex flex-1 justify-center items-center bg-black h-100% text-bold b-green hover:b-white b-2 b-solid mono">
      {#if pageNumber == 0}
        T MINUS 10 DAGAR
      {:else if pageNumber == 1}
      T MINUS 4 DAGAR
      {:else if pageNumber == 2}
      T MINUS 3 DAGAR
      {:else if pageNumber == 3}
      T MINUS 2 DAGAR
      {:else}
        LAUNCH DAY
      {/if}
    </div>
    <button class="flex justify-center items-center bg-black w-8 md:w-16 h-100% text-white text-3xl md:text-5xl cursor-pointer b-green hover:b-white b-solid mono" onclick={() => {pageNumber++; if (pageNumber > 4) pageNumber = 0}}>
      {#if pageNumber < 4}→{/if}
    </button>
  </div>

      
  <div class="flex flex-col items-center mb-24 w-100% max-w-200 text-base">
    {#if pageNumber == 0}
      <img transition:slide src={d10} alt="i" class="m-2 w-100% b-white b-solid b-2">
      <div transition:slide class="flex flex-col gap-3 bg-black p-4 w-100% text-neutral-200 b-white b-solid b-2">
        <p class="text-2xl">Välkomna tillbaka, METAcrafters!</p>
        <p><b>TLDR:</b> METAcraft öppnar 26 december på IP <span class="mono">mc.datasektionen.se</span> med en storslagen launch-event. <a href="https://discord.gg/MttUbkmeyD" target="_blank" class="text-green"><b>Gå med i Discorden</b></a> så missar du inget.</p>

        <hr class="w-100%">
        
        <p>Det har varit två långa år (irl) utan mining och crafting här i sektionen, och efter våra galna events längtar vi bara ännu mer till den klassiska vanilla-upplevelsen. Nu är väntan äntligen över: <b>METAcraft gör snart sin storslagen återkomst!</b> 🎉</p> 
        
        <p>Ta med era vänner och träda in i en värld av under: samma spel ni älskar, med nya ansikte och gamla vänner, samt en hel del engagerande server-händelser som aldrig tidigare skådats! Utforska vad som har hänt under de sista 1 000 åren (i Minecraft), kriga för din plats i legenderna, starta upp ditt affärsimperium, eller konstruera ditt mästerverk, vare sig det är ett borg, en drake, eller en gigantisk labyrint. Vi garanterar att det kommer alltid finnas saker att göra i denna nya upplevelse: vi har fått fundera och slipa på det över ett helt millenium, trots allt!</p>
        
        <p><b>den 26 december öppnar METAcraft sin port till helt nya & spännande äventyr.</b> Den kommer börja med en launch-event där ni kommer bland annat få en ordentlig introduktion till allt som servern har att erbjuda, samt hemliga aktiviteter att utföra. Missa den inte! 🎂</p>
        
        <p>Gå med i vår <a href="https://discord.gg/MttUbkmeyD" target="_blank" class="text-green"><b>Discord server</b></a> så att du inte missar en enda händelse.</p>
        <p>Server IP (Java 1.20.2): <span class="mono">mc.datasektionen.se</span></p>
      </div>
    {:else if pageNumber == 1}
      <img transition:slide src={d4} alt="i" class="m-2 w-100% b-white b-solid b-2">
      <div transition:slide class="flex flex-col gap-3 bg-black p-4 w-100% text-neutral-200 b-white b-solid b-2">
        <p class="text-2xl">Endast 4 dagar återstår innan survivalservern öppnas.</p>
        <p>Under tiden har vi rotat djupt i ett laboratorium, och funnit denna blueprint som kan vara av intresse...</p>
      </div>
    {:else if pageNumber == 2}
      <img transition:slide src={d3} alt="i" class="m-2 w-100% b-white b-solid b-2">
      <div transition:slide class="flex flex-col gap-3 bg-black p-4 w-100% text-neutral-200 b-white b-solid b-2">
        <p class="text-2xl">Survivalservern öppnas om mindre än 72 timmar!</p>
        <p>Vi har fått in en spännande rekommendation som kan gynna alla byteshandlare...</p>
      </div>
    {:else if pageNumber == 3}
      <img transition:slide src={d2} alt="i" class="m-2 w-100% b-white b-solid b-2">
      <div transition:slide class="flex flex-col gap-3 bg-black p-4 w-100% text-neutral-200 b-white b-solid b-2">
        <p class="text-2xl">God jul, METAcraftare!</p>
        <p>Ikväll råder det julefrid, men med mindre än 48 timmar kvar till launch tänker vi snabbt påminna om några client-side mods för att maxa spelupplevelsen!</p>
        <p>Om du aldrig har använt mods förut eller använder den officiella Minecraft-launchern, så rekommenderar vi att använda Fabric Loader enligt följande instruktioner:</p>
        <ol class="ml-4 list-decimal">
          <li>Ladda ner installationsprogrammet <a href="https://fabricmc.net/use/installer/" target="_blank" class="text-green">här</a> och följ instruktionerna för att sätta upp profilen för 1.20.2.</li>
          <li>Installera Simple Voice Chat <a href="https://modrinth.com/plugin/simple-voice-chat" target="_blank" class="text-green">här</a>, plus ev. andra mods du vill ha.</li>
          <li>Placera .jar-filen du just har laddat ner i mods-mappen under .minecraft.</li>
          <li>Starta spelet med den nya Fabric-profilen!</li>
        </ol>
        <p>Det är såklart inte krav att spela med några mods, men det är starkt rekommenderat att åtminstone spela med Simple Voice Chat för den bästa upplevelsen, eftersom mycket av det vi planerat på servern bygger på att man kan höra varandra i spelet.</p>
        <p>Om du använder en 3rd party launcher som MultiMC, Prism, Lunar, CurseForge etc, följ instruktionerna för din launcher på hur man installerar mods.</p>
        <p>Vi ses på servern!</p>
      </div>
    {:else}
      <img transition:slide src={dlaunch} alt="i" class="m-2 w-100% b-white b-solid b-2">
      <div transition:slide class="flex flex-col gap-3 bg-black p-4 w-100% text-neutral-200 b-white b-solid b-2">
        <p class="text-2xl">ÄR NI REDO?</p>
        <p>Vi kommer börja med en Campusrundvandring (i minecraft). Där kommer vi gå igenom allt som är bra att känna till! Det kommer även finnas en liten frågesport där vinnaren kommer få ett försprång med resurser, så missa den inte!</p>
        <p>Vi ses på servern!</p>
        </div>
    {/if}
  </div>

  <Footer />


