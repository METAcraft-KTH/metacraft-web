<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
</script>


<!-- !! CUSTOM BG !! -->
<style>
	.custombg {
		background-image: linear-gradient(
        #724b4f80, 
        #724b4f80
      ), url("$lib/images/background2.png")
	}
</style>
<div class="w-100lvw h-100lvh fixed z--10 custombg bg-center-center bg-cover" />
<!-- !! CUSTOM BG !! -->

<Title>
	REGLER
</Title>

<PageDescription>
	För allas trivsel har vi skrivit några enkla regler som alla förväntas att följa.<br>Genom att spela på servern godkänner du att följa reglerna.
</PageDescription>

	<Main>
		<div class="max-w-250">
			<Hotlink id="general" title="Generellt">
				<div class="mb-4">
					På METAcraft finns det en mängd olika spelare med olika sätt att spela Minecraft på.
					Därför finns det också en mängd olika regler för att alla ska kunna ha kul, och delta i de
					delar av servern som de vill.
				</div>
				<div class="mb-4">
					Världen är uppdelad i två typer av områden: <b>Civiliserade zoner</b> och
					<b>Vildmarken.</b> Läs mer om dessa nedan och vilka regler som gäller för dem. Om du bryter
					mot regler, skapar oreda, förstör för andra spelare, eller fuskar, kan du få en varning eller
					eller bli avstängd från servern.
				</div>
				<div class="mb-4">
					Istället för att stängas av kan du även hamna i <b>Exil</b> under en kortare period,
					vilket innebär att du är fast i <b>Vildmarken</b> och förlorat rättigheten att använda chatten.
				</div>
				<div class="mb-4">
					Om du stöter på problem, trakasserier eller brytande av regler, rapportera det genom att
					skapa en ticket på METAcrafts Discord server.
				</div>
			</Hotlink>

			<Hotlink id="chat" title="Chatten">
				<div class="mb-4">
					I chatten i spelet, i röstchatten, och på discord, gäller följande regler:
					<ul class="list-disc list-inside ml-2">
						<li>Var artig och respektfull mot andra spelare.</li>
						<li>
							På servern förhåller vi oss till <a
								href="https://styrdokument.datasektionen.se/jamlikhetspolicy"
								> Datasektionens JML-policy</a
							>.
						</li>
						<li>
							Undvik att marknadsföra andra servrar eller tjänster. Spam, reklam och oönskade länkar
							är inte tillåtna.
						</li>
					</ul>
				</div>
			</Hotlink>

			<Hotlink id="cheating" title="Fusk">
				<div class="mb-4">
					Fusk är absolut inte tillåtet i METAcraft eller något event som arrangeras i anknytning
					till servern. Fuskar du kan du avstängd från servern och får inte delta i event.
				</div>
				<div class="mb-4">
					Till fusket räknas bland annat:
					<ul class="list-disc list-inside ml-2">
						<li>Hackade klienter</li>
						<li>X-ray</li>
						<li>Flyghack</li>
						<li>Att duplicera items</li>
					</ul>
				</div>
				<div class="mb-4">
					Fråga någon i METAcraft-teamet om du är osäker på om något är fusk eller inte.
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

			<Hotlink id="civilization" title="Civilisationen">
				<div class="mb-4">
					<b>Positiva Z-koordinater</b> och <b>innanför Imperiets murar</b> räknas som civiliserade zoner.
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
					reparera. Bra Minecraft-etikett är särskilt viktig innanför Imperiets murar eller nära
					någons bas.
				</div>
			</Hotlink>

			<Hotlink id="wilderness" title="Vildmarken">
				<div class="mb-4">
					<b>Negativa Z-koordinater utanför Imperiets murar</b> räknas till vildmarken.
				</div>
				<div class="mb-4">
					I vildmarken råder anarki. <b>PvP, stöld och griefing är tillåtet.</b> Det är tillåtet att
					spränga baser och stjäla saker.
				</div>
				<div class="mb-4">
					Med det sagt är <b>fusk</b> inte tillåtet även i vildmarken, se reglerna om fusk.
				</div>
			</Hotlink>
		</div>
	</Main>
