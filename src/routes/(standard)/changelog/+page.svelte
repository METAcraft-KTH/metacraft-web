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
    <Hotlink id="010424" title={d('2024/04/15')}>
			<ul>
        <li>Minecraft Hexathlon ({d('2024/04/19')}) annonserades för första gången.</li>
      </ul>
		</Hotlink>
		<Hotlink id="010424" title={d('2024/04/11')}>
			<ul>
        <li>Tävlingen mot Karlsruhe Institute of Technology ({d('2024/04/17')}) annonserades för första gången.</li>
      </ul>
		</Hotlink>
		<Hotlink id="010424" title={d('2024/04/01') + ' — "BE$O$craft"'}>
			<ul>
        <li>BE$O$craft är live på IP:n <span class="font-mono bg-slate-300 font-bold">betasektionen.se</span>. Den använder spelversion Beta 1.7.3.</li>
        <li>Discordservern har rebrandats till att vara BE$O$craft-temad. Detta återställdes efter 28 timmar.</li>
      </ul>
		</Hotlink>
		<Hotlink id="100324" title={d('2024/03/10')}>
			<ul>
        <li>Hemsidan har gjorts om för att vara mer kompatibel med mobilskärmar.</li>
        <li>Ny information har lagts till på hemsidan, inklusive denna changelog.</li>
      </ul>
		</Hotlink>
		<Hotlink id="010324" title={d('2024/03/01')}>
			<ul>
        <li>Byggtävlingens slutdatum har förlängts till efter tentaperioden. Exakt datum är obestämt.</li>
      </ul>
		</Hotlink>
    <Hotlink id="170224" title={d('2024/02/17')}>
			<ul>
        <li>Ny item: Helselegering
          <ul>
            <li>Används till att reparera ett netherite item till 100% hållbarhet, helt utan Ancient Debris.</li>
            <li>Exakt recept är dold för tillfället. Ledtråd finns i Dr Alpert Hortens kontor.</li>
          </ul>
        </li>
        <li>Nya items: Helsestoft och smältdegel
          <ul>
            <li>Används för att tillverka helselegering.</li>
            <li>Exakt recept är dold för tillfället. Ledtråd finns i Dr Alpert Hortens kontor.</li>
          </ul>
        </li>
      </ul>
		</Hotlink>
    <Hotlink id="160224" title={d('2024/02/16') + ' — "Byggtävlingen"'}>
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
    <Hotlink id="140224" title={d('2024/02/14')}>
			<ul>
        <li>På grund av ett kommunikationsmiss är det nya "netherit-liknande" materialet ännu inte implementerat på servern. Denna uppdatering är försenad till ett obestämt datum.</li>
        <li>Regnsäsong har startats. Regn förekommer vanligare.</li>
      </ul>
		</Hotlink>
    <Hotlink id="090224" title={d('2024/02/09') + ' — "3.0.2"'}>
			<ul>
        <li>Ny event: Byggtävlingen
          <ul>
            <li>Eventet löper från 16 februari till 1 mars. Mer information följer.</li>
          </ul>
        </li>
        <li>Ny item: <a href="/mods#carts">Gruvvagn Mk. III</a>
          <ul>
            <li>En uppgradering av Gruvvagn Mk. II med en topphastighet på 30 m/s.</li>
          </ul>
        </li>
        <li>En ny, "netherit-liknande" material har släppts. Ledtråd hävdas finnas i Dr Hortens kontor på campus.
        </li>
      </ul>
		</Hotlink>
    <Hotlink id="030224" title={d('2024/02/03') + ' — "3.0.1 Migration Patch"'}>
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
        <li>En påminnelse om <a href="/mods#carts">Gruvvagn Mk. II</a> skickades ut.</li>
      </ul>
		</Hotlink>
    <Hotlink id="050124" title={d('2024/01/05')}>
			<ul>
        <li>Portalöppningen har startats.
          <ul>
            <li>Huvudeventet består av en lång och komplex PVE-event där deltagarna måste döda fientliga mobs som kommer igenom portalen.</li>
          </ul>
        </li>
        <li>Netherdimensionen är nu tillgänglig för alla spelare, efter Borgarordens seger i striden.</li>
      </ul>
		</Hotlink>
    <Hotlink id="261223" title={d('2023/12/26') + ' — "3.0 Grand Opening"'}>
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
        <li>
          Ny item: Gruvvagn Mk. II
          <ul>
            <li>En uppgraderad gruvvagn med en topphastighet på 20 m/s.</li>
          </ul>
        </li>
      </ul>
		</Hotlink>
  </div>
</Main>