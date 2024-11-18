<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import profilesImage from '$lib/images/install_guide/profiles.png';
	import addAccountImage from '$lib/images/install_guide/add-account.png';
	import addInstanceImage from '$lib/images/install_guide/add-instance.png';
	import importImage from '$lib/images/install_guide/import.png';
	import launchImage from '$lib/images/install_guide/launch.png';
	import setupImage from '$lib/images/install_guide/setup.png';
	import allowMicrophoneImage from '$lib/images/install_guide/allow-microphone.png';
</script>

<Header />
<div class="bg-bookshelf w-100%">
	<main class="bg-white main block m-auto line-height-normal p-5">
		<h1 class="mc10 text-black text-4xl md:text-5xl px-3 py-2 rd">Prism Launcher/MultiMC-Guide</h1>
		<div class="bg-red px-3 py-2 m-3 max-w-lg rd">
			<span class="mc10">Voice Chat på Mac</span>
			<p>
				Mac-användare måste använda Prism Launcher (eller MultiMC) för att kunna använda Simple
				Voice Chat. Mac-datorer kräver att program frågar efter tillåtelse för att använda
				mikrofonen. Eftersom Minecraft inte vanligtvis använder mikrofonen kan den vanliga Minecraft
				launchern inte användas. Följ därför denna guide för att installera Simple Voice Chat med
				Prism Launcher.
			</p>
		</div>
		<div class="bg-yellow px-3 py-2 m-3 max-w-lg">
			<span class="mc10">Uppdatera till 1.21.3</span>
			<p>
				Det lättaste sättet att uppdatera är att genomföra stegen nedan igen och skapa en ny profil
				för METAcraft från den nyaste METAcraft.zip-länken.
			</p>
			<br />
			<p>
				Det går också bra att uppdatera manuellt i Prism launcher om du vet hur man gör. Ladda ner
				nya versioner av modsen och ersätt jar-filerna. Ändra sedan Minecraft och Fabric Loader till
				1.21.3.
			</p>
		</div>

		<p class="mb-3">
			Denna guide är primärt för Prism Launcher, men instruktionerna är likadana för MultiMC.
		</p>
		<p>Om du redan har använt Prism Launcher förut kan du skippa steg 1 & 2.</p>

		<h2 class="mc10 text-2xl mt-4">1. Ladda ner Prism Launcher</h2>
		<p>Ladda ner Prism Launcher från <a href="https://prismlauncher.org/">prismlauncher.org</a>.</p>

		<h2 class="mc10 text-2xl mt-4">2. Logga in med ditt Microsoftkonto</h2>
		<p>Tryck på "Accounts" i övre högra hörnet.</p>
		<img src={profilesImage} alt="Tryck på Profiler i övre högra hörnet" />
		<p>
			Lägg till ditt konto genom att logga in med ditt Microsoftkonto. Följ instruktionerna från
			Prism Launcher.
		</p>
		<img src={addAccountImage} alt="Välj 'Add Microsoft'" />

		<h2 class="mc10 text-2xl mt-4">3. Lägg till METAcraft</h2>
		<p>Välj "Add Instance", sedan "Import".</p>
		<img src={addInstanceImage} alt="Välj 'Add instance'" />
		<p>Kopiera och klistra in följande länk:</p>
		<div class="link p-3 mc7 color-white rd inline-block">
			https://metacraft.nu/install/METAcraft.zip
		</div>
		<img src={importImage} alt="Välj 'Import'" />

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
