<script lang="ts">
  import Splash from "$lib/layout/standard/Splash.svelte";
  import Main from "$lib/layout/standard/Main.svelte";
  import Title from "$lib/layout/standard/Title.svelte";

  import img from "./besoscraft.jpg"; // ÄNDRA FÖR VARJE POST

	import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
  $: url = `url('${img}')`;

  let post = true;
</script>

<!-- TODO: gör det här elementet till en layout? -->
<div class="w-100% flex flex-col bg-stone">

  <Splash --image={url}>
    <Title {post}>
      METACRAFT ÄR DÖD, LEVE BE$O$CRAFT
    </Title>
  </Splash>

  <Main {post}>
    <div class="text-center w-100%">
      <TypeAndTime type={'event'} date={'2024/4/1'} style={'mb-6 md:mb-10'} />
    </div>
    <!-- TODO: make these into $lib/textstyle components -->
    <p class="mb-6">
      Ni som har loggat in på servern någon gång under mars har garanterat märkt två saker:
    </p>
    <ol class="mb-6">
      <li>1. Ett block försvann från Arkitekthusets ruiner.</li>
      <li>2. Inte en enda levande människa har varit inne på servern. (Ja, inklusive dig! Tråkigt att du fick reda på nyheten så här.)</li>
    </ol>

    <p class="mb-6">
      Med anledning av ovannämnt har vi beslutat att <b>stänga ner METAcraft permanent.</b> Men oroa er icke! Den ersätts av <b>BE$O$craft</b>, en spännande ny koncept som använder den bästa spelversionen genom tiderna: <b>Beta 1.7.3</b>! Du kan gå med i den nya (gamla) servern redan nu, följ bara instruktionerna nedan!
    </p>
    <h1 class="text-2xl font-bold mb-3">Instruktionerna nedan</h1>
    <ol class="mb-6">
      <li>1. Gå till inställningarna i din Minecraft launcher</li>
      <li>2. Sätt på "historiska versioner"</li>
      <li>3. Skapa en ny inställning för Beta 1.7.3 (b1.7.3)</li>
      <li>4. Ignorera Mojangs varningar om "player safety features" (snarare 1984 features)</li>
      <li>5. Anslut till <span class="font-mono">betasektionen.se</span>!</li>
    </ol>
    <h1 class="text-2xl font-bold mb-3">FAQ</h1>
    <h2 class="text-xl font-bold mb-3">Vad innebär det för mig som spelare?</h2>
    <p>Du kan se fram emot flera fördelar, såsom:</p>
    <ul class="list-disc mb-6 ml-4">
      <li> inga jävla fackförbund</li>
    </ul>
    
    <h2 class="text-xl font-bold mb-3">Kan jag spela på METAcraft ändå?</h2>
    <p class="mb-6">
      Ja, men inte länge till! BE$O$craft är här för att stanna, och vi är överens om att det är den bästa riktningen för servern framöver.
    </p>
    <h2 class="text-xl font-bold mb-3">Kan jag donera till be$o$?</h2>
    <p class="mb-12">
      ja
    </p>
    <p class="mb-6">
      Ytterligare frågor ej besvarade här hänvisas till Ticket-systemet på vår Discord-server. Notera att vi inte kommer läsa frågorna.
    </p>
    <p class="mb-6">
      Ha så kul, och länge leve BE$O$!
    </p>
  </Main>


</div>