<script lang="ts">
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';

	import profilesImage from '$lib/images/install_guide/profiles.png';
	import addAccountImage from '$lib/images/install_guide/add-account.png';
	import addInstanceImage from '$lib/images/install_guide/add-instance.png';
	import importImage from '$lib/images/install_guide/import.png';
	import launchImage from '$lib/images/install_guide/launch.png';
	import setupImage from '$lib/images/install_guide/setup.png';
	import allowMicrophoneImage from '$lib/images/install_guide/allow-microphone.png';

	import Windows from '$lib/icons/platform/Windows.svelte';
	import Linux from '$lib/icons/platform/Linux.svelte';
	import Apple from '$lib/icons/platform/Apple.svelte';
	import minecraftLauncherIcon from '$lib/images/launcher/minecraft_launcher.png';
	import prismLauncherIcon from '$lib/images/launcher/prism_launcher.png';
	import H1 from '$lib/textstyles/H1.svelte';
	import { slide } from 'svelte/transition';

    let selectedPlatform = $state("Windows");

    const platformButtons = [
        ["Windows", Windows],
        ["Mac", Apple],
        ["Linux", Linux]
    ];

    let selectedLauncher = $state("Vanilla Launcher");

    const launcherButtons = [
        ["Vanilla Launcher", minecraftLauncherIcon],
        ["Prism / MultiMC", prismLauncherIcon]
    ];

    const RELEASE = '26.1.2';
	const INSTALLER_JAR_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.jar`;
	const INSTALLER_EXE_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.exe`;
</script>

<!-- CUSTOM BG -->
<div class="z--10 fixed bg-bookshelf bg-cover bg-center-center w-100lvw h-100lvh"></div>

<Title>
	VOICE CHAT
</Title>

<h1 class="mb-2 text-white text-center mc7">Ditt operativsystem?</h1>
<div class="flex flex-row bg-calcite mx-auto mb-8 rounded-xl max-w-200 overflow-hidden">
    {#each platformButtons as [platformName, PlatformIcon]}
        <button class="flex flex-col flex-1 items-center bg-opacity-40 p-2 border-none transition-colors"
            class:bg-blue={selectedPlatform === platformName}
            class:text-blue-900={selectedPlatform === platformName}
            class:bg-transparent={selectedPlatform !== platformName}
            onmousedown={() => {selectedPlatform = platformName}}>
            <div class="text-3xl">
                <PlatformIcon />
            </div>
            <span class="mc7">{platformName}</span>
        </button>
    {/each}
</div>

{#if selectedPlatform !== 'Mac'}
<div transition:slide={{duration: 100}}>
    <h1 class="mb-2 text-white text-center mc7">Hur startar du Minecraft?</h1>
    <div class="flex flex-row bg-calcite mx-auto mb-8 rounded-xl max-w-200 overflow-hidden">
        {#each launcherButtons as [launcherName, launcherIcon]}
            <button class="flex flex-col flex-1 items-center bg-opacity-40 p-2 border-none transition-colors"
                class:bg-blue={selectedLauncher === launcherName}
                class:text-blue-900={selectedLauncher === launcherName}
                class:bg-transparent={selectedLauncher !== launcherName}
                onmousedown={() => {selectedLauncher = launcherName}}>
                <img src={launcherIcon} alt={launcherName} class="mb-2 h-12" />
                <span class="mc7">{launcherName}</span>
            </button>
        {/each}
    </div>
</div>
{:else}
<div transition:slide={{duration: 100}}>
    <div class="bg-map mx-auto mb-8 p-8 rounded-xl max-w-180">
        <h1 class="mb-2 text-2xl mc10">Viktigt: Voice Chat på Mac</h1>
        <p class="leading-tight">
            Mac-användare <b>måste</b> använda Prism Launcher (eller MultiMC) för att kunna använda Simple
            Voice Chat. Mac-datorer kräver att program frågar efter tillåtelse för att använda
            mikrofonen, och eftersom vanilla Minecraft inte använder mikrofon så kan inga mods begära tillåtelsen heller. Följ därför denna guide för att installera Simple Voice Chat med
            Prism Launcher.
        </p>
    </div>
</div>
{/if}

{#if selectedLauncher === 'Prism / MultiMC' || selectedPlatform === 'Mac'}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>Prism Launcher/MultiMC-Guide</H1>
        <div class="bg-yellow m-3 px-3 py-2 max-w-lg">
            <span class="mc10">Uppdatera till 26.1.2</span>
            <p>
                Det lättaste sättet att uppdatera är att genomföra stegen nedan igen och skapa en ny profil
                för METAcraft från den nyaste METAcraft.zip-länken.
            </p>
            <br />
            <p>
                Det går också bra att uppdatera manuellt i Prism launcher om du vet hur man gör. Ladda ner
                nya versioner av modsen och ersätt jar-filerna. Ändra sedan Minecraft och Fabric Loader till
                0.19.2 eller senare.
            </p>
        </div>

        <p class="mb-3">
            Denna guide är primärt för Prism Launcher, men instruktionerna är likadana för MultiMC.
        </p>
        <p>Om du redan har använt Prism Launcher förut kan du skippa steg 1 & 2.</p>

        <h2 class="mt-4 text-2xl mc10">1. Ladda ner Prism Launcher</h2>
        <p>Ladda ner Prism Launcher från <a href="https://prismlauncher.org/">prismlauncher.org</a>.</p>

        <h2 class="mt-4 text-2xl mc10">2. Logga in med ditt Microsoftkonto</h2>
        <p>Tryck på "Accounts" i övre högra hörnet.</p>
        <img src={profilesImage} alt="Tryck på Profiler i övre högra hörnet" class="max-w-200" />
        <p>
            Lägg till ditt konto genom att logga in med ditt Microsoftkonto. Följ instruktionerna från
            Prism Launcher.
        </p>
        <img src={addAccountImage} alt="Välj 'Add Microsoft'" class="max-w-200" />

        <h2 class="mt-4 text-2xl mc10">3. Lägg till METAcraft</h2>
        <p>Välj "Add Instance", sedan "Import".</p>
        <img src={addInstanceImage} alt="Välj 'Add instance'" class="max-w-200" />
        <p>Kopiera och klistra in följande länk:</p>
        <div class="inline-block bg-black p-3 link mc7 color-white rd">
            https://metacraft.nu/install/METAcraft.zip
        </div>
        <img src={importImage} alt="Välj 'Import'" class="max-w-200" />

        <h2 class="mt-4 text-2xl mc10">4. Starta spelet!</h2>
        Markera METAcraft och välj sedan "Launch" för att starta spelet.
        <img src={launchImage} alt="Välj 'Launch'" class="max-w-200" />

        <h2 class="mt-4 text-2xl mc10">5. Aktivera Simple Voice Chat</h2>
        Första gången du använder Simple Voice Chat behöver du konfigurera det genom att välja vilken mikrofon
        och högtalare moddet ska använda. För att göra detta, tryck på tangenten 'V' på tangentbordet. Välj
        sedan 'Next'.
        <img src={setupImage} alt="Simple Voice Chat setup" class="max-w-200" />
        <p>
            Följ sedan instruktionerna för att slutföra konfigureringen av Simple Voice Chat. Om du kör
            Mac, se nedan då du behöver ge tillgång till mikrofonen.
        </p>

        <h2 class="mt-4 text-2xl mc10">6. Tillåt mikrofon (endast på Mac)</h2>
        <p class="mb-3">
            <strong>Viktigt</strong> att du inte glömmer detta steg om du kör på Mac. Detta ger Minecraft tillåtelse
            att använda mikrofonen.
        </p>
        <img src={allowMicrophoneImage} alt="Tillåt Mikrofonen" class="max-w-200" />
    </Main>
</div>
{:else if selectedPlatform === 'Windows'}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>Voice Chat Installer</H1>
        <p><a href={INSTALLER_EXE_URL}>Klicka här för att ladda ner installern! (Windows)</a></p>
        <p>
            Starta sedan exe-programmet och följ instruktionerna där.
        </p>
    </Main>
</div>
{:else}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>Voice Chat Installer</H1>
        <p><a href={INSTALLER_JAR_URL}>Klicka här för att ladda ner installern! (Linux)</a></p>
        <p>
            Starta sedan jar-programmet och följ instruktionerna där.
        </p>
    </Main>
</div>
{/if}
