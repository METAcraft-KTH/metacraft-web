<script>
	import logo from '$lib/images/logo_big.png';
	import PageCard from '$lib/widgets/PageCard.svelte';
	import adventurer from '$lib/images/pr_squares/adventurer.png';
	import engineer from '$lib/images/pr_squares/engineer.png';
	import trader from '$lib/images/pr_squares/trader.png';
	import warrior from '$lib/images/pr_squares/warrior.png';
	import PrSquare from '$lib/widgets/PrSquare.svelte';
	import LaunchBanner from '$lib/widgets/LaunchBanner.svelte';
</script>

<div class="flex flex-justify-center flex-items-center flex-col">
	<div class="flex justify-center w-100%">
		<img src={logo} alt="METAcraft" class="logo p-8 max-h-200px" />
		<LaunchBanner />
	</div>

	<PageCard>
		<div class="grid grid-cols-2 grid-rows-2 gap-4 p-8 max-w-80vw">
			<PrSquare>
				<img src={adventurer} alt="Adventurer" slot="image" />
				<h2 slot="title">För Äventyrare</h2>
				<p slot="content">
					Utforska världen, hitta ledtrådar och pussla ihop berättelsen bakom borgarorden och dess
					kamp mot de onda. Delta i event och bli en del av serverns historia! Läs mer i
					<a href="/features#lore">Lore</a>.
				</p>
			</PrSquare>
			<PrSquare>
				<img src={engineer} alt="Engineer" slot="image" />
				<h2 slot="title">För Ingenjörer</h2>
				<p slot="content">
					METAcraft behåller alla viktiga detaljer i hur Minecraft fungerar, så att alla avancerade
					redstone-maskiner fungerar som de ska. Bygg mob farms, sorteringsmaskiner och automatisera
					dina resurser! Läs mer i <a href="/features#mechanics">Tekniska detaljer</a>.
				</p>
			</PrSquare>
			<PrSquare>
				<img src={trader} alt="Trader" slot="image" />
				<h2 slot="title">För Byteshandlare</h2>
				<p slot="content">
					Samla dyrbarheter, köp och sälj med andra spelare, och bygg ditt handelsimperium.
					METAcraft har ett unikt shopsystem som för det enkelt att sätta upp affärer och handla med
					andra spelare. Läs mer i <a href="/features#shopmod">Shop mod</a>.
				</p>
			</PrSquare>
			<PrSquare>
				<img src={warrior} alt="Warrior" slot="image" />
				<h2 slot="title">För Krigare</h2>
				<p slot="content">
					Slåss mot andra spelare i vildmarken eller PvP-arenan, eller utrusta dig med dina
					medspelare och delta i event och besegra monster och bossar. Läs mer om
					<a href="/features#wilderness">Vildmarken</a>.
				</p>
			</PrSquare>
		</div>
	</PageCard>
</div>
