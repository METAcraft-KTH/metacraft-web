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
	import { m } from '$lib/paraglide/messages.js';
    import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';

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
<div class="-z-10 fixed bg-bookshelf bg-cover bg-center w-[100lvw] h-[100lvh]"></div>

<Title>
	VOICE CHAT
</Title>

<h1 class="mb-2 font-mc text-white text-center">{m.install_os_question()}</h1>
<div class="flex flex-row bg-calcite mx-auto mb-8 rounded-xl max-w-200 overflow-hidden">
    {#each platformButtons as [platformName, PlatformIcon]}
        <button class="flex flex-col flex-1 items-center p-2 border-none transition-colors"
            class:bg-blue-500={selectedPlatform === platformName}
            class:text-blue-900={selectedPlatform === platformName}
            class:bg-transparent={selectedPlatform !== platformName}
            onmousedown={() => {selectedPlatform = platformName}}>
            <div class="text-3xl">
                <PlatformIcon />
            </div>
            <span class="font-mc">{platformName}</span>
        </button>
    {/each}
</div>

{#if selectedPlatform !== 'Mac'}
<div transition:slide={{duration: 100}}>
    <h1 class="mb-2 font-mc text-white text-center">{m.install_launcher_question()}</h1>
    <div class="flex flex-row bg-calcite mx-auto mb-8 rounded-xl max-w-200 overflow-hidden">
        {#each launcherButtons as [launcherName, launcherIcon]}
            <button class="flex flex-col flex-1 items-center p-2 border-none transition-colors"
                class:bg-blue-500={selectedLauncher === launcherName}
                class:text-blue-900={selectedLauncher === launcherName}
                class:bg-transparent={selectedLauncher !== launcherName}
                onmousedown={() => {selectedLauncher = launcherName}}>
                <img src={launcherIcon} alt={launcherName} class="mb-2 h-12" />
                <span class="font-mc">{launcherName}</span>
            </button>
        {/each}
    </div>
</div>
{:else}
<div transition:slide={{duration: 100}}>
    <div class="bg-book mx-auto mb-8 p-8 rounded-xl max-w-180">
        <h1 class="mb-2 font-ten text-2xl">{m.install_mac_important_title()}</h1>
        <p class="leading-tight">
            <LocalizedRichText msg={m.install_mac_important} />
        </p>
    </div>
</div>
{/if}

{#if selectedLauncher === 'Prism / MultiMC' || selectedPlatform === 'Mac'}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>{m.install_prism_guide_title()}</H1>
        <div class="bg-yellow-400 m-3 px-3 py-2 max-w-lg">
            <span class="font-ten">{m.install_prism_update_title()}</span>
            <p>
                {m.install_prism_update_p1()}
            </p>
            <br />
            <p>
                {m.install_prism_update_p2()}
            </p>
        </div>

        <p class="mb-3">
            {m.install_prism_guide_intro()}
        </p>
        <p>{m.install_prism_skip_note()}</p>

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step1_title()}</h2>
        <p>{m.install_prism_step1_pre()}</p>

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step2_title()}</h2>
        <p>{m.install_prism_step2_p1()}</p>
        <img src={profilesImage} alt={m.install_prism_step2_alt1()} class="max-w-200" />
        <p>
            {m.install_prism_step2_p2()}
        </p>
        <img src={addAccountImage} alt={m.install_prism_step2_alt2()} class="max-w-200" />

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step3_title()}</h2>
        <p>{m.install_prism_step3_p1()}</p>
        <img src={addInstanceImage} alt={m.install_prism_step3_alt1()} class="max-w-200" />
        <p>{m.install_prism_step3_p2()}</p>
        <div class="inline-block bg-black p-3 font-mc link text-white rounded">
            https://metacraft.nu/install/METAcraft.zip
        </div>
        <img src={importImage} alt={m.install_prism_step3_alt2()} class="max-w-200" />

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step4_title()}</h2>
        {m.install_prism_step4_body()}
        <img src={launchImage} alt={m.install_prism_step4_alt()} class="max-w-200" />

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step5_title()}</h2>
        {m.install_prism_step5_body()}
        <img src={setupImage} alt="Simple Voice Chat setup" class="max-w-200" />
        <p>
            {m.install_prism_step5_p2()}
        </p>

        <h2 class="mt-4 font-ten text-2xl">{m.install_prism_step6_title()}</h2>
        <p class="mb-3">
            <LocalizedRichText msg={m.install_prism_step6_body} />
        </p>
        <img src={allowMicrophoneImage} alt={m.install_prism_step6_alt()} class="max-w-200" />
    </Main>
</div>
{:else if selectedPlatform === 'Windows'}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>{m.install_voice_chat_installer_title()}</H1>
        <p><a href={INSTALLER_EXE_URL}>{m.install_windows_download_cta()}</a></p>
        <p>
            {m.install_windows_after_download()}
        </p>
    </Main>
</div>
{:else}
<div transition:slide={{duration: 200}}>
    <Main>
        <H1>{m.install_voice_chat_installer_title()}</H1>
        <p><a href={INSTALLER_JAR_URL}>{m.install_linux_download_cta()}</a></p>
        <p>
            {m.install_linux_after_download()}
        </p>
    </Main>
</div>
{/if}
