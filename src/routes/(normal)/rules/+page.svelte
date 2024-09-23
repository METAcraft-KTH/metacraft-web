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
	Tack för att du vill vara en del av METAcrafts fantastiska community! För allas trivsel har vi skrivit några enkla regler som alla förväntas att följa, vilket gäller på alla våra Minecraft-servrar samt på Discord.<br><b>Genom att spela på servern godkänner du att följa reglerna!</b>
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
					I textchatten och röstchatten på både Minecraft och Discord, gäller följande regler:
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
					<b>Fusk är absolut inte tillåtet</b> i någon av METAcrafts servrar, <b>även i PVP-zoner</b>. Fuskar du kan du avstängd från
					servern och inte får delta i event.
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
					<b>Undvik så långt det går att generera för mycket lagg.</b> Du är inte ensam på servern, och
					påverkar det prestandan kan du bli ombedd att stänga av din maskin och skära ner på
					djuruppfödning.
				</div>
				<div class="mb-4">
					Se till att minimera mängden block och ljus som ändras när du använder din maskin. Fråga
					någon kunnig i METAcraft-teamet om du är osäker på om din maskin är lagg-vänlig.
				</div>
			</Hotlink>

			<Hotlink id="survival" title="För Survival-servern">
				<div class="mb-4">
					Förutom på PVP-ön (1500, -1500), <b>i Survival-världen</b> gäller civiliserade spelandet. Det innebär alltså:
				</div>
				<div class="mb-4">
					<ul class="list-disc ml-6">
						<li class="mb-2">
							<b>PVP, stöld och griefing är förbjudet.</b> Det är tillåtet att smyga runt i folks baser, kika i deras kistor, och spela spratt på
							dem, men du får inte förstöra något eller stjäla något. Om du vill ha något, fråga först.
						</li>
						<li class="mb-4">
							<b>Försök följa god Minecraft-etikett.</b> Vi tänker inte tvinga någon att fixa creeper-hål och svävande blocks efter sig, men om du råkar förstöra någon annans bas bör du hjälpa till med reparationen.
						</li>
					</ul>
				</div>
				<div class="mb-4">
					<b>På PVP-ön (1500, -1500)</b> får du PVP:a och förstöra hur mycket du vill, men alla andra regler gäller som vanligt.
				</div>
			</Hotlink>
		</div>
	</Main>