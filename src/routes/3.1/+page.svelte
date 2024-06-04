<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';

  import Title from "$lib/layout/standard/Title.svelte";
  
  import BossbarOverlay from "./lib/notched_6_background.png";
  import BossbarBackground from "./lib/pink_background.png";
  import BossbarProgress from "./lib/pink_progress.png";

  import trial_maps from "./attachments/trial_maps.png";

	import Header from "$lib/layout/Header.svelte";
	import Footer from "$lib/layout/Footer.svelte";

  import Countdown from './Countdown.svelte';
  import Shortcut from './Shortcut.svelte';
  
  import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import Message from './Message.svelte';
	import DayStart from './DayStart.svelte';

  const scrollDown = () => {
    let targetPx = window.innerHeight - 3.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    window.scrollTo({top: targetPx, behavior: 'smooth'})
  }

  let sunday = new Date('2024-06-09T19:00:00.000+02:00').getTime();
  let monday = new Date('2024-06-03T19:00:00.000+02:00').getTime();
  let now = Date.now();

  let progressBarPercentage = (now-monday)/(sunday-monday)*100;

  console.log(progressBarPercentage);
  
</script>

<Header splashPage={true} />

<!-- !! CUSTOM BG !! -->
<style>
  @font-face {
    font-family: 'OCR';
    src: url('./lib/OCRAEXT.TTF');
    font-weight: normal;
    font-style: normal;
  }
	.custombg {
		background-image: url("./lib/page_splash.webp");
	}
  .custombg2 {
		background-image: radial-gradient(
        #000000b0, 
        #000000b0
      ), url("./lib/end_gateway.avif");
    image-rendering: pixelated;
	}
  .ocr {
    font-family: 'OCR', monospace;
  }
</style>
<div class="w-100lvw h-100lvh fixed z--10 bg-center-center custombg2" />

<div class="w-100% min-h-100svh pt-10 block">
  <div class="absolute top-0 left-0 w-100% h-100% bg-center-bottom bg-cover custombg z--5" />

  <Title>3.1<br>FINAL CAMPAIGN</Title>

  <Countdown />

  <button class="notButton absolute bottom-0 left-0 w-100% h-15 m-0 text-center color-white titleFadeIn" on:mousedown={scrollDown}>
    <ChevronDown />
  </button>
</div>

<div class="mx-auto mt-4 md:mt-12 mb-12 w-100% max-w-250 p-2 rd">
  <iframe class="w-100% aspect-video" style="box-shadow: 0 0 0 .5rem black" src="https://www.youtube-nocookie.com/embed/Uy6ZGn5OHdk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<!--<Main bg="black" text="white">
</Main>-->

<p class="text-center ocr text-red-5 text-lg md:text-xl mb-4 px-3">INTERN KOMMUNIKATION. OBEHÖRIGA ÄGA EJ TILLTRÄDE.<br>LADDA OM SIDAN FÖR ATT UPPDATERA MÄTAREN.</p>

<div class="relative flex flex-col gap-3 items-center text-white text-lg ocr w-100% max-w-180">
  <span class="text-center">ÅTERSTÄLLER ARKIVDATA... [1/6]</span>
  <img src={BossbarBackground} alt="bossbar" class="w-100%" style="image-rendering: pixelated;">
  <img src={BossbarProgress} alt="bossbar" class="w-100% absolute bottom-0 left-0" style={`image-rendering: pixelated;
    clip-path: polygon(0 0, ${progressBarPercentage}% 0, ${progressBarPercentage}% 100%, 0 100%);`}>
  <img src={BossbarOverlay} alt="bossbar" class="w-100% absolute bottom-0 left-0" style="image-rendering: pixelated;">
</div>
<div class="flex flex-row w-100% max-w-180 ocr">
  <Shortcut href="#tis">TIS</Shortcut>
  <Shortcut disabled={true} href="#ons">ONS</Shortcut>
  <Shortcut disabled={true} href="#tors">TORS</Shortcut>
  <Shortcut disabled={true} href="#fre">FRE</Shortcut>
  <Shortcut disabled={true} href="#lör">LÖR</Shortcut>
  <Shortcut disabled={true} href="#sön">SÖN</Shortcut>
</div>

<main class="ocr w-100% max-w-200 mb-20 md:mb-32 text-white">

  <DayStart href="tis">TISDAG, 4 JUNI</DayStart>

  <Message iconUUID="bc2396c1c9154134a7e1206f4ddfb69e" head="Trial Chambers" subhead="Från Imperiets Försvar">
    <p class="mb-2">Våra spejare har upptäckt nya underjordiska byggnader. Enligt deras undersökning skulle dessa strukturer ha kallats "utmaningskammare", samt innehållit exklusiva skatter.</p>
    <p class="mb-2">Vi har hunnit kartlägga minst nio sådana kammare. Koordinaterna är markerade i kartor som finns att hämta gratis vid $hamn. Se bifogad bild för var man kan hämta dessa.</p>
    <p class="mb-2">Det är möjligt att vi hittar uråldriga vapen som kan komma till användning i Kriget. Därför vill jag be om resurser för att utforska och lära oss mer om dessa kammare. </p>
    <a href={trial_maps} target="_blank" class="block no-underline"><img src={trial_maps} alt="tis_map.png" ><p class="text-sm text-gray-6">trial_maps.png - Klicka för att visa i ett annat fönster.</p></a>
  </Message>

  <Message head="Re: Trial Chambers" subhead="Från Borgarorden" iconOnLeft={false}>
    <p class="mb-2">Väldigt intressant. Nu när Kriget är nära har vi tyvärr svårt att delegera fler resurser, men vi ska inventera och återkomma snarast. Under tiden är du välkommen att involvera medborgarna och låta dem sätta igång först.</p>
  </Message>

  <!--<DayStart href="ons">ONSDAG, 5 JUNI</DayStart>

  <Message head="Soulboundinatorn" subhead="Internt pressmeddelande">
    <p class="mb-2">Lystring! En av våra assistenter har lyckats bygga en ny maskin som vi kallar Soulboundinatorn! Denna maskin använder föremålets kraft för att göra så att du kan behålla dina items i din inventory när du dör! Vi planerar att testa den här maskinen när vi öppnar endportalen på söndag!</p>
  </Message>-->
</main>


<Footer />


