<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Windows from '$lib/icons/platform/Windows.svelte';
	import Linux from '$lib/icons/platform/Linux.svelte';
	import Apple from '$lib/icons/platform/Apple.svelte';
	import minecraftLauncherIcon from '$lib/images/launcher/minecraft_launcher.png';
	import prismLauncherIcon from '$lib/images/launcher/prism_launcher.png';
	import type { Component } from 'svelte';
	import { goto } from '$app/navigation';

	const RELEASE = '1.21.11';
	const INSTALLER_JAR_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.jar`;
	const INSTALLER_EXE_URL = `https://github.com/METAcraft-KTH/METAcraft-installer/releases/download/${RELEASE}/metacraft-installer-1.0.0.exe`;

	type Platform = {
		name: string;
		icon: Component;
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

	let selectedPlatform: Platform | null = $state(null);
	let selectedLauncher: Launcher | null = $state(null);


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
	$effect(() => {
		if (selectedPlatform === mac) {
			// Mac must use Prism Launcher, so do not prompt for launcher.
			selectedLauncher = prismLauncher;
			nextStep();
		}
	});
</script>

<Header />
<div class="min-block-screen bg-cover bg-center-center bg-fixed w-100% background">
	<div class="flex flex-col items-center gap-4 md:gap-8 backdrop-blur px-2 py-12 w-100% h-100%">
		{#if selectedPlatform === null || selectedLauncher === null}
			<span
				class="inline bg-white shadow-xl px-3 py-2 text-black text-4xl md:text-5xl text-center mc10 rd"
			>
				INSTALLERA VOICE CHAT
			</span>

			{#if selectedPlatform === null}
				<div class="flex flex-wrap flex-justify-around gap-32 bg-white px-12 py-8 text-6xl rd">
					{#each platforms as platform}
						<div class="text-center platform" onclick={() => (selectedPlatform = platform)}>
							<div class="icon color-coolgray">
								<platform.icon />
							</div>
							<span class="mc10">{platform.name}</span>
						</div>
					{/each}
				</div>
			{:else if selectedLauncher === null}
				<div class="bg-white px-12 py-8 text-6xl rd">
					<div class="mb-16 text-center">
						<span
							class="inline bg-white shadow-xl px-3 py-2 text-black text-4xl md:text-5xl text-center mc7 rd"
						>
							Hur startar du Minecraft?
						</span>
					</div>
					<div class="flex flex-wrap flex-justify-around gap-32">
						{#each launchers as launcher}
							<div
								class="text-center platform"
								onclick={() => {
									selectedLauncher = launcher;
									nextStep();
								}}
							>
								<div class="icon color-coolgray">
									<img src={launcher.icon} alt={launcher.name} />
								</div>
								<span class="mc10">{launcher.name}</span>
								{#if launcher.subtitle}
									<span class="block text-2xl mc7">{launcher.subtitle}</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{:else if selectedLauncher === minecraftLauncher}
			<span class="inline bg-white shadow-xl px-3 py-2 text-black text-center mc7 rd">
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
