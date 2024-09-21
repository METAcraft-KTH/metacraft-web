<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import profilesImage from '$lib/images/multimc-guide/profiles.png';
	import addAccountImage from '$lib/images/multimc-guide/add-account.png';
	import addInstanceImage from '$lib/images/multimc-guide/add-instance.png';
	import importFromZipImage from '$lib/images/multimc-guide/import-from-zip.png';
	import launchImage from '$lib/images/multimc-guide/launch.png';
	import setupImage from '$lib/images/multimc-guide/setup.png';
	import allowMicrophoneImage from '$lib/images/multimc-guide/allow-microphone.png';
</script>

<Header />
<div class="bg-bookshelf w-100%">
	<main class="bg-white main block m-auto line-height-normal p-5">
		<h1 class="mc10 text-black text-4xl md:text-5xl px-3 py-2 rd">MULTIMC-GUIDE</h1>
		<div class="bg-red px-3 py-2 m-3 max-w-lg rd">
			<span class="mc10">Voice Chat på Mac</span>
			<p>
				Mac-användare måste använda MultiMC för att kunna använda Simple Voice Chat. Mac-datorer
				kräver att program frågar efter tillåtelse för att använda mikrofonen. Eftersom Minecraft
				inte vanligtvis använder mikrofonen kan den vanliga Minecraft launchern inte användas. Följ
				därför denna guide för att installera Simple Voice Chat med MultiMC.
			</p>
		</div>

		<p>Om du redan har använt MultiMC förut kan du skippa steg 1 & 2.</p>

		<h2 class="mc10 text-2xl mt-4">1. Ladda ner MultiMC</h2>
		<p>Ladda ner MultiMC från <a href="https://multimc.org/#Download">multimc.org</a>.</p>

		<h2 class="mc10 text-2xl mt-4">2. Logga in med ditt Microsoftkonto</h2>
		<p>Tryck på Profiler i övre högra hörnet.</p>
		<img src={profilesImage} alt="Tryck på Profiler i övre högra hörnet" />
		<p>
			Lägg till ditt konto genom att logga in med ditt Microsoftkonto. Följ instruktionerna från
			MultiMC.
		</p>
		<img src={addAccountImage} alt="Välj 'Add Microsoft'" />

		<h2 class="mc10 text-2xl mt-4">3. Lägg till METAcraft</h2>
		<p>Välj "Add Instance", sedan "Import from zip".</p>
		<img src={addInstanceImage} alt="Välj 'Add instance'" />
		<p>Kopiera och klistra in följande länk:</p>
		<div class="link p-3 mc7 color-white rd inline-block">
			https://metacraft.nu/multimc/METAcraft.zip
		</div>
		<img src={importFromZipImage} alt="Välj 'Import from zip'" />

		<h2 class="mc10 text-2xl mt-4">4. Starta spelet!</h2>
		Markera METAcraft och välj sedan "Launch" för att starta spelet.
		<img src={launchImage} alt="Välj 'Launch'" />

		<h2 class="mc10 text-2xl mt-4">5. Aktivera Simple Voice Chat</h2>
		Första gången du använder Simple Voice Chat behöver du konfigurera det genom att välja vilken mikrofon
		och högtalare moddet ska använda. För att göra detta, tryck på tangenten 'V' på tangentbordet. Välj
		sedan 'Next'.
		<img src={setupImage} alt="Simple Voice Chat setup" />
		<p>
			Följ sedan instruktionerna för att slutföra konfigureringen av Simple Voice Chat. Om du kör
			Mac, se nedan då du behöver ge tillgång till mikrofonen.
		</p>

		<h2 class="mc10 text-2xl mt-4">6. Tillåt mikrofon (endast på Mac)</h2>
		<p class="mb-3">
			<strong>Viktigt</strong> att du inte glömmer detta steg om du kör på Mac. Detta ger Minecraft tillåtelse
			att använda mikrofonen.
		</p>
		<img src={allowMicrophoneImage} alt="Tillåt Mikrofonen" />
	</main>
</div>
<Footer />

<style>
	.main {
		max-width: 900px;
	}
	.link {
		background-color: #777;
		border: 5px solid #555;
		user-select: all;
	}
</style>
