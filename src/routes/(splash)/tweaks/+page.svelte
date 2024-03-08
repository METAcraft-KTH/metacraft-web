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
      ), url("$lib/images/splashes/cavesun.webp")
	}
</style>
<div class="w-100lvw h-100lvh fixed z--10 custombg bg-center-center bg-cover" />
<!-- !! CUSTOM BG !! -->

<Title>
	JUSTERINGAR
</Title>

<PageDescription>
	För optimal spelupplevelse har vi infört en hel del Quality of Life-ändringar, listad nedan!
</PageDescription>
	<Main>
		<div class="max-w-250">
			<Hotlink id="reparation" title="Reparation och Enchanting">
				Reparation av vapen, verktyg och rustningar har balanserats om så att de kostar signifikant
				mindre material, och kostnaden i xp går inte upp. Det finns heller inget tak för hur många
				gånger ett föremål kan repareras eller enchantas.
			</Hotlink>
			<Hotlink id="mending" title="Mending">
				För att behålla en efterfrågan på reparationsmaterial på marknaden kan villagers inte längre
				sälja mending-böcker. Inga andra böcker är ändrade. Servern använder <span class="font-bold">inte</span> <a href="https://minecraft.wiki/w/Villager_Trade_Rebalance" target="_blank">Villager Trade Rebalance</a>-datapacken.
			</Hotlink>
			<Hotlink id="fishing" title="Fiske">
				Fiskar man mycket får man akta sig, det kan luras odödliga i botten av havet!
			</Hotlink>
			<Hotlink id="duping" title="Duplicering">
				Duplicering av TNT och sand är vanligt förekommande, men är <span class="font-bold">borttaget</span> från METAcraft på grund av lagg. Sand kan fås från Husks, och TNT kan placeras med dispensers. Behövs rörliga maskiner med TNT kan
				man använda sig av movable tile entities.
			</Hotlink>
			<Hotlink id="sand" title="Sand">
				Husks (zombies i ökenlandskap) har en chans att tappa sand när de dör, och kan då farmas för
				fönybar sand. Husks spawnar dessutom i mängder i dessert temples.
			</Hotlink>
			<Hotlink id="movable-tile-entitites" title="Movable Tile Entitites">
				För avancerade redstone-maskiner kan man göra block med tile entities (dispensers, kistor,
				etc) flyttbara med pistons. Titta på ett sådant block och använd kommandot <div
					class="bg-gray-3 p-2px inline-block"
				>
					/set-piston-movable true
				</div>
				för att göra blocket flyttbart. Man kan även använda
				<div class="bg-gray-3 p-2px inline-block">/set-piston-movable-default true</div>
				För att göra alla blocken man placerar flyttbara.
			</Hotlink>
			<Hotlink id="status" title="Statyer">
				Genom att signera och döpa en skriven bok till "Statues" (stort S är viktigt) så får man en
				bok som kan användas för att manipulera armor stands för att skapa avancerade statyer.
			</Hotlink>
			<Hotlink id="portals" title="Portaler">
				Netherportaler kan tändas i många olika storlekar och formationer, inte bara traditionella
				rektanglar.
			</Hotlink>
			<Hotlink id="pearls" title="Enderpärlor">
				Enderpärlor kan nu teleportera spelare mellan dimensioner.
			</Hotlink>
			<Hotlink id="heads" title="Huvuden">
				Levande varelser har en chans att tappa sitt huvud om de dödas av en spelare. Det gäller
				även andra spelare!
			</Hotlink>
			<Hotlink id="wanderingtrader" title="Vandrande byteshandlaren">
				Den vandrande byteshandlaren har med sig spännande små block att byta mot ett större.
			</Hotlink>
			<Hotlink id="firetick" title="Eld">
				Inom imperiets murar så sprids inte eld, och bränner inte upp block.
			</Hotlink>
			<Hotlink id="silence" title="Tysta djur">
				Döper man ett djur till "Silence me" så slutar den att göra ljud ifrån sig.
			</Hotlink>
		</div>
	</Main>
