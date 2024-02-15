<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
</script>

<div class="m-t20 p-b300px">
	<PageCard>
		<div class="p-4 max-w-60vw">
			<Hotlink id="reparation" title="Reparation och Enchanting">
				Reparation av vapen, verktyg och rustningar har balanserats om så att de kostar signifikant
				mindre material, och kostnaden i xp går inte upp. Det finns heller inget tak för hur många
				gånger ett föremål kan repareras eller enchantas.
			</Hotlink>
			<Hotlink id="mending" title="Mending">
				För att behålla en efterfrågan på reparationsmaterial på marknaden kan villagers inte längre
				sälja mending-böcker. Inga andra böcker är ändrade.
			</Hotlink>
			<Hotlink id="fishing" title="Fiske">
				Fiskar man mycket får man akta sig, det kan luras odödliga i botten av havet!
			</Hotlink>
			<Hotlink id="duping" title="Duplicering">
				Duplicering av TnT och sand är vanligt förekommande, men är borttaget från METAcraft. Sand
				kan fås från Husks, och TnT kan placeras med dispensers. Behövs rörliga maskiner med TnT kan
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
				Portaler kan tändas i många olika storlekar och formationer, inte bara traditionella
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
	</PageCard>
</div>
