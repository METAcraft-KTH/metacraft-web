<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
</script>

<div class="m-t20 p-b300px">
	<PageCard>
		<div class="p-4 max-w-60vw">
			<Hotlink id="general" title="Generellt">
				<div class="mb-4">
					På METAcraft finns det en mängd olika spelare med olika sätt att spela Minecraft på.
					Därför finns det också en mängd olika regler för att alla ska kunna ha kul, och delta i de
					delar av servern som de vill.
				</div>
				<div class="mb-4">
					Världen är uppdelade i två delar: <b>Civilisationen</b> och <b>Vildmarken</b>. Läs mer om
					dessa nedan och vilka regler som gäller för dom.
				</div>
				<div class="mb-4">
					Om du bryter mot regler, skapar oreda, förstör för andra spelare, eller fuskar, kan du bli
					avstängd från servern.
				</div>
			</Hotlink>

			<Hotlink id="cheating" title="Fusk">
				<div class="mb-4">
					Fusk är absolut inte tillåter i METAcraft eller något event som arrangeras i anknytning
					till servern. Fuskar du på servern riskerar du avstängning från servern och får inte delta
					i event.
				</div>
				<div class="mb-4">
					Till fusket räknas bland annat:
					<ul class="list-disc list-inside">
						<li>Hackade klienter</li>
						<li>x-ray</li>
						<li>Flyghack</li>
						<li>Att duplicera items (med undantag av tänd TnT för farms)</li>
					</ul>
				</div>
				<div class="mb-4">
					Fråga någon i METAcraft-teamet om du är osäker på om något är fusk eller inte.
				</div>
			</Hotlink>

			<Hotlink id="civilization" title="Civilisationen">
				<div class="mb-4">
					<b>Positiva Z-koordinater</b> och <b>I METAborg</b> räknas till civilizationen. Det gör
					även dimensionerna <b>Nether</b> och <b>End</b>.
				</div>
				<div class="mb-4">
					Här upprätthålls vanliga regler och sunt förnuft. <b
						>PvP, stöld och griefing är förbjudet.</b
					>
				</div>
				<div class="mb-4">
					Det är tillåtet att smyga runt i folks baser, kika i deras kistor, och spela spratt på
					dem. Men du får inte förstöra något eller stjäla något. Om du vill ha något, fråga först.
				</div>

				<div class="mb-4">
					Du förväntas också följa god Minecraft-etikett. Lämna aldrig flygande block eller fula
					hål. Om en creeper förstör någon annans saker på grund av dig, borde du hjälpa till och
					reparera. Bra Minecraft-etikett är särskilt viktig nära spawn eller nära någons bas.
				</div>
			</Hotlink>
			<Hotlink id="wilderness" title="Vildmarken">
				<div class="mb-4">
					<b>Negativa Z-koordinater utanför METAborg </b> räknas till vildmarken, och det gäller
					bara i <b>Övervärlden</b>. Vildmarken avgränsas med en mur för att förtydliga var den
					börjar.
				</div>
				<div class="mb-4">
					I vildmarken råder anarki. <b>PvP, stöld och griefing är tillåtet.</b> Det är tillåtet att
					spränga baser och stjäla saker.
				</div>
				<div class="mb-4">
					Med det sagt är fusk inte tillåtet även i vildmarken, se reglerna om fusk.
				</div>
			</Hotlink>
			<Hotlink id="machines" title="Maskiner och automatisering">
				<div class="mb-4">
					METAcraft behåller så mycket tekniska detaljer från vanliga Minecraft som möjligt, och det
					är tillåtet att utnyttja dessa för att ex skapa maskiner, farma mobs, och förstöra
					bedrock.
				</div>
				<div class="mb-4">
					Undvik så långt det går att generera för mycket lag. Du är inte ensam på servern, och
					påverkar det prestandan kan du bli ombedd att stänga av din maskin och skära ner på
					djuruppfödning.
				</div>
				<div class="mb-4">
					Se till att minimera mängden block och ljust som ändras när du använder din maskin. Fråga
					någon kunnig i METAcraft-teamet om du är osäker på om din maskin är lagvänlig.
				</div>
				<div class="mb-4">
					Föder du upp allt för många djur ökar risken för spontana blixtnedslag i hagen.
				</div>
			</Hotlink>
		</div>
	</PageCard>
</div>
