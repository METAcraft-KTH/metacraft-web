<script lang="ts">
	import Main from "$lib/layout/standard/Main.svelte";
	import PageDescription from "$lib/layout/standard/PageDescription.svelte";
  import Title from "$lib/layout/standard/Title.svelte";
	import Hotlink from "$lib/widgets/Hotlink.svelte";

  function d (date: string) {
    return new Date(date).toLocaleDateString('sv-SE', {'weekday': 'long', 'year': 'numeric', 'month': 'short', 'day': '2-digit'});
  }
</script>

<style>
  ul {
    list-style-type: "»    ";
    margin-left: 2rem;
  }
  ul li::marker {
    color: #9d174d;
  }
</style>

<Title>
  CHANGELOG
</Title>

<PageDescription>
  <p class="mb-4 text-center">Här är en detaljerad lista av allt noterbart som har hänt sedan starten av den nuvarande servern (säsong 3).</p>
  <p>Om du föredrar uppdateringsloggar med <span class="italic">personlighet</span>, se <a href="/news">nyheter</a>.</p>
</PageDescription>

<Main bg="concrete">
  <div class="max-w-250 w-100%">
		<Hotlink id="080324" title={d('2024-03-08')}>
			<ul>
        <li>Hemsidan har gjorts om för att vara mer kompatibel med mobilskärmar.</li>
        <li>Ny information har lagts till på hemsidan, inklusive denna changelog.</li>
      </ul>
		</Hotlink>
		<Hotlink id="010324" title={d('2024-03-01')}>
			<ul>
        <li>Byggtävlingens slutdatum har förlängts till efter tentaperioden. Exakt datum är obestämt.</li>
      </ul>
		</Hotlink>
    <Hotlink id="170224" title={d('2024-02-17')}>
			<ul>
        <li>Ny item: Helsestoft
          <ul>
            <li>Tillverkas med 1 av varje malmblock (kol, järn, koppar, guld, rödsten, lapis, diamant, smaragd, kvarts).</li>
          </ul>
        </li>
        <li>Ny item: Smältdegel
          <ul>
            <li>Finns i två varianter: tom och fylld.</li>
            <li>En tom smältdegel tillverkas på samma sätt som en dekorativ kruka, men med 4 nedertegelstenar istället för vanliga tegelstenar.</li>
            <li>En fylld smältdegel tillverkas med 8 helsestoft och 1 tom smältdegel.</li>
          </ul>
        </li>
        <li>Ny item: Helselegering
          <ul>
            <li>Används till att reparera ett netherite item till 100% hållbarhet, helt utan Ancient Debris.</li>
            <li>Framtas genom att smälta en fylld smältdegel i en masugn.</li>
          </ul>
        </li>
        
      </ul>
		</Hotlink>
    <Hotlink id="160224" title={d('2024-02-16') + ' — "Byggtävlingen"'}>
			<ul>
        <li>Byggtävlingen har startats.
          <ul>
            <li>Temat är "Nämndhögkvarter".</li>
            <li>Alla deltagare behöver registrera sig i <a href="https://forms.gle/StndstJmA8gotEgf6" target="_blank">detta formulär.</a></li>
            <li>Deltagarna har fram till 1 mars att bygga med sina egna blocks, i plotområdet till öster om campus.</li>
            <li>Efter omröstningen kommer vinnarens byggnad att placeras på campus bakom META.</li>
            <li>Ytterligare priser utlovas för alla deltagare men är inte avslöjade.</li>
          </ul>
        </li>
      </ul>
		</Hotlink>
    <Hotlink id="140224" title={d('2024-02-14')}>
			<ul>
        <li>På grund av ett kommunikationsmiss är det nya "netherit-liknande" materialet ännu inte implementerat på servern. Denna uppdatering är försenad till ett obestämt datum.</li>
        <li>Regnsäsong har startats. Regn förekommer vanligare.</li>
      </ul>
		</Hotlink>
    <Hotlink id="090224" title={d('2024-02-09') + ' — "3.0.2"'}>
			<ul>
        <li>Ny event: Byggtävlingen
          <ul>
            <li>Eventet löper från 16 februari till 1 mars. Mer information följer.</li>
          </ul>
        </li>
        <li>Craftingreceptet till <a href="/mods#carts">Gruvvagn Mk. III</a> har annonserats på nytt.</li>
        <li>En ny, "netherit-liknande" material har släppts. Ledtråd hävdas finnas i Dr Hortens kontor på campus.
        </li>
      </ul>
		</Hotlink>
    <Hotlink id="030224" title={d('2024-02-03') + ' — "3.0.1 Migration Patch"'}>
			<ul>
        <li>Servern har uppdaterats från 1.20.2 till 1.20.4.</li>
        <li>Crafters och alla nya tuff- och kopparblocks kan tillverkas enligt vanilla-recept.
          <ul>
            <li>Trial Chambers har inte lagts till, då de fortfarande är i ett ofärdigt skick.</li>
          </ul>
        </li>
        <li>Bundles kan nu tillverkas.
          <ul>
            <li>Craftingreceptet hittas i crafting-boken i inventoryn.</li>
            <li>För tillfället håller varje bundle 1 stack items, men vi har planer att utöka detta i framtida uppdateringar.</li>
          </ul>
        </li>
        <li><a href="/mods#carts">Gruvvagn Mk. III</a> kan nu tillverkas.
          <ul>
            <li>Mk. III har topphastighet på 30 m/s.</li>
            <li>Craftingreceptet till Gruvvagn Mk. II och Mk. III hittas i crafting-boken.</li>
          </ul>
        </li>
      </ul>
		</Hotlink>
    <Hotlink id="050124" title={d('2024-01-05')}>
			<ul>
        <li>Portalöppningen har startats.
          <ul>
            <li>En lång och komplex PVE-event där deltagarna måste döda fientliga mobs som kommer igenom portalen.</li>
          </ul>
        </li>
        <li>Netherdimensionen är nu tillgänglig för alla spelare, efter Borgarordens seger i striden.</li>
      </ul>
		</Hotlink>
    <Hotlink id="261223" title={d('2023-12-26') + ' — "3.0"'}>
			<ul>
        <li>METAcraft Säsong 3 invigdes officiellt.</li>
        <li>Ny mini-event: Campusrundvandring
          <ul>
            <li>En kort guidad tur kring campus, ledd av några från Borgarorden.</li>
          </ul>
        </li>
        <li>Ny event: Portalöppningen
          <ul>
            <li>Dr Alpert Hortens research indikerar att 1 000 guldblock och en "Interdimensionell Relativitetskärna" krävs för att etablera kontakt till Netherdimensionen.</li>
          </ul>
        </li>
      </ul>
		</Hotlink>
  </div>
</Main>