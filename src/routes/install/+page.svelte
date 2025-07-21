<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Windows from '$lib/icons/platform/Windows.svelte';
	import Linux from '$lib/icons/platform/Linux.svelte';
	import Apple from '$lib/icons/platform/Apple.svelte';
	import minecraftLauncherIcon from '$lib/images/launcher/minecraft_launcher.png';
	import prismLauncherIcon from '$lib/images/launcher/prism_launcher.png';
	import type { ComponentType } from 'svelte';
	import { goto } from '$app/navigation';

	const RELEASE = '1.21.8';
	const INSTALLER_JAR_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.jar`;
	const INSTALLER_EXE_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.exe`;

	type Platform = {
		name: string;
		icon: ComponentType;
	};

	const windows: Platform = {
		name: 'Windows',
		icon: Windows
	};
	const linux: Platform = {
		name: 'Linux',
		icon: Linux
	};
	const mac: Platform = {
		name: 'Mac',
		icon: Apple
	};

	const platforms = [windows, linux, mac];

	type Launcher = {
		name: string;
		subtitle?: string;
		icon: string;
	};

	const minecraftLauncher = {
		name: 'Minecraft Launcher',
		icon: minecraftLauncherIcon
	};
	const prismLauncher = {
		name: 'Prism Launcher',
		subtitle: '(eller MultiMC)',
		icon: prismLauncherIcon
	};

	const launchers: Launcher[] = [minecraftLauncher, prismLauncher];

	let selectedPlatform: Platform | null = null;
	let selectedLauncher: Launcher | null = null;

	$: if (selectedPlatform === mac) {
		// Mac must use Prism Launcher, so do not prompt for launcher.
		selectedLauncher = prismLauncher;
		nextStep();
	}

	function nextStep() {
		if (selectedPlatform === windows && selectedLauncher === minecraftLauncher) {
			location.href = INSTALLER_EXE_URL;
		} else if (selectedPlatform === linux && selectedLauncher === minecraftLauncher) {
			location.href = INSTALLER_JAR_URL;
		}

		if (selectedLauncher === prismLauncher || selectedPlatform === mac) {
			goto('/install/prism');
		}
	}
</script>

<Header />
<div class="background w-100% bg-center-center bg-cover bg-fixed min-block-screen">
	<div class="w-100% h-100% py-12 px-2 backdrop-blur flex flex-col items-center gap-4 md:gap-8">
		{#if selectedPlatform === null || selectedLauncher === null}
			<span
				class="mc10 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd"
			>
				INSTALLERA VOICE CHAT
			</span>

			{#if selectedPlatform === null}
				<div class="flex flex-wrap flex-justify-around gap-32 text-6xl bg-white px-12 py-8 rd">
					{#each platforms as platform}
						<div class="platform text-center" on:click={() => (selectedPlatform = platform)}>
							<div class="icon color-coolgray">
								<svelte:component this={platform.icon} />
							</div>
							<span class="mc10">{platform.name}</span>
						</div>
					{/each}
				</div>
			{:else if selectedLauncher === null}
				<div class="text-6xl bg-white px-12 py-8 rd">
					<div class="text-center mb-16">
						<span
							class="mc7 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd"
						>
							Hur startar du Minecraft?
						</span>
					</div>
					<div class="flex flex-wrap flex-justify-around gap-32">
						{#each launchers as launcher}
							<div
								class="platform text-center"
								on:click={() => {
									selectedLauncher = launcher;
									nextStep();
								}}
							>
								<div class="icon color-coolgray">
									<img src={launcher.icon} alt={launcher.name} />
								</div>
								<span class="mc10">{launcher.name}</span>
								{#if launcher.subtitle}
									<span class="mc7 block text-2xl">{launcher.subtitle}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{:else if selectedLauncher === minecraftLauncher}
			<span class="mc7 inline bg-white text-black px-3 py-2 text-center shadow-xl rd">
				Kör METAcraft installeraren för att skapa en profil i Minecraft Launchern. Fråga gärna på
				Discord om du behöver hjälp!
			</span>
		{/if}
	</div>
</div>
<Footer />

<style>
	.background {
		background-image: url('/src/lib/images/background-s4-water.png');
	}
	.platform {
		transition: transform 50ms ease-in-out;
		cursor: pointer;
		max-width: 300px;
	}
	.icon {
		font-size: 200px;
		transition: color 50ms ease-in-out;
	}
	.platform:hover {
		transform: scale(1.05);
	}
	.platform:hover .icon {
		color: #38bdf8;
	}
</style>
