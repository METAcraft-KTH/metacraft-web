<script lang="ts">
  import Splash from "$lib/layout/standard/Splash.svelte";
  import Main from "$lib/layout/standard/Main.svelte";
  import Title from "$lib/layout/standard/Title.svelte";

  import img from "$lib/images/splashes/main.webp"; // ÄNDRA FÖR VARJE POST

  import teaser from "./3.0.1.png";

	import TypeAndTime from "$lib/widgets/TypeAndTime.svelte";
  $: url = `url('${img}')`;

  let post = true;
</script>

<!-- TODO: gör det här elementet till en layout? -->
<div class="w-100% flex flex-col bg-stone">

  <Splash --image={url}>
    <Title {post}>
      3.0.1 - Migration Patch
    </Title>
  </Splash>

  <Main {post}>
    <div class="text-center w-100%">
      <TypeAndTime type={'update'} date={'2024-2-3'} style={'mb-6 md:mb-10'} />
    </div>
    <!-- TODO: make these into $lib/textstyle components -->
    <p class="mb-6 text-center text-neutral italic">
      Detta inlägg var först publicerade på <a href="/discord" target="_blank">Discordservern</a> fredag 26 jan. 2024. Datumet ovan avser dagen uppdateringen officiellt släpptes på servern.
    </p>
    <p class="mb-6 text-center">
      <img src={teaser} alt="update teaser" class="max-h-80" />
    </p>
    <p class="mb-6">
      Har du någonsin haft tanken: "Wow vad jag älskar METAcraft, om det bara fanns fler unika & intressanta mechanics att utforska, ja lite lore skulle också sitta fint!" Har du? Bra! Vi är stolta att presentera säsongens första minor update, där vi introducerar INGET av ovanstående, MEN servern hamnar på 1.20.4. Om du spelar med en modpack (t.ex. Fabulously Optimized) så är det dags att migrera dina mods!
    </p>
    <p class="mb-6">
      <b>Servern kommer stängas av för underhållning & uppdatering fredagen 2 februari 19:00</b> och förväntas dröja inte mer än en timme. Ni är välkomna att återansluta på 1.20.4 vid 20:00.
    </p>
    <p class="mb-6">
      Nedan följer den fullständiga listan av ändringar:
    </p>
      <ul class="list-disc mb-6 ml-4">
        <li>Serverns spelversion uppdateras till 1.20.4. Man kommer inte kunna logga in på servern med 1.20.2.</li>
        <li>
          <b>Crafters</b> och alla nya tuff- och kopparblocks kommer kunna tillverkas enligt vanilla-recept.
          <ul class="ml-8 list-circle">
            <li>Trial Chambers kommer inte läggas till, då den är fortfarande i ett ofärdigt skick.</li>
          </ul>
        </li>
        <li>
          <b>Bundles</b> kommer kunna tillverkas.
          <ul class="ml-8 list-circle">
            <li>Se crafting-boken i din inventory för receptet.</li>
            <li>För tillfället håller varje bundle 1 stack items, men vi har planer att utöka detta i framtida uppdateringar.</li>
          </ul>
        </li>
        <li>
          <b>Uppgraderade minecarts</b> kan också tillverkas.
          <ul class="ml-8 list-circle">
            <li>Dessa är snabbare än tidigare minecarts och recept kan såklart hittas i crafting-boken.</li>
          </ul>
        </li>
      </ul>
    <p class="mb-6">
      Vi ses på servern!
    </p>
  </Main>


</div>