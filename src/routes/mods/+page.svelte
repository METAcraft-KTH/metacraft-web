<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
	import shop_barrel from '$lib/images/mods/shop_barrel.jpg';
	import shop_config from '$lib/images/mods/shop_config.jpg';
	import shop_crafting from '$lib/images/mods/shop_crafting.jpg';
	import shop_hoppers from '$lib/images/mods/shop_hoppers.jpg';
	import shop_simple from '$lib/images/mods/shop_simple.jpg';
	import shop_trades from '$lib/images/mods/shop_trades.jpg';
</script>

<div class="m-t20 p-b300px">
	<PageCard>
		<div class="p-4 max-w-60vw">
			<Hotlink id="mods" title="Mods">
				<div class="mb-4">
					METAcraft håller sig nära upplevelsen av en vanlig Minecraft servern, men vi har några väl
					utvalda modifikationer och plugins som förhöjer upplevelsen. Den här sidan detaljerar
					några av dom lite mer avancerade modsen, och hur man kommer igång och använder dom.
				</div>
			</Hotlink>

			<Hotlink id="shops" title="Shops">
				<div class="mb-8">
					Byteshandel är en västentlig komponent på en Minecraftserver. För att fostra en eknomi med
					hög omsättning har METAcraft ett enkelt system för att sätta upp små shops för att göra
					handeln enkel och smidig.
				</div>
				<div class="mb-8 flex flex-row flex-justify-between w-100%">
					<div class="mr-8">
						Börja med att konstruera ett shop-block enligt receptet. Träslag och färg på ullen är
						valfritt. Placera sedan ovanpå eller på sidan av en tunna för att aktivera shopen.
					</div>
					<img src={shop_crafting} alt="crafting" class="h-200px" />
					<img src={shop_simple} alt="simple shop" class="h-200px" />
				</div>
				<div class="mb-8 flex flex-row flex-justify-between w-100%">
					<div class="mr-8">
						Konfigurera byten genom att öppna shop-blocket. Varje set av tre rutor är ett byte, där
						de två första är betalningen och den sista rutan är föremålet som köps. När du klickar
						med föremål i konfigurationsmenyn så kopieras informationen, så du blir inte av med
						föremålen. Lägg sedan föremålen att sälja i tunnan för att göra dom tillgänglig för
						byte.
						<div class="mt-4">
							I exemplet vill ägaren sälja en netherit-hacka för 5 diamanter, och en hög med
							järntackor för råjärn + lite kol.
						</div>
					</div>
					<img src={shop_config} alt="shop config" class="h-200px" />
					<img src={shop_barrel} alt="shop barrel" class="h-200px" />
				</div>
				<div class="mb-8 flex flex-row flex-justify-between w-100%">
					<div class="mr-8">
						Spelare som interagerar med shopen eller tunnan blir presenterade en menyn med byten.
						Sakerna de köper plockas från tunnan, och betalningar läggs där med. Ägaren kan även se
						och testa bytena genom att smyga och öppna shop-blocket, och får hjälpsam information om
						de uppsatta bytena fungerar eller ej.
					</div>
					<img src={shop_trades} alt="shop trades" class="h-200px" />
				</div>
				<div class="mb-8 flex flex-row flex-justify-between w-100%">
					<div class="mr-8">
						De som vill kan automatisera affärer med trattar. Trattarna kan inte interagera med
						tunnan som en vanlig tunna, men sitter det en tratt under tunnan när ett byte genomförs
						så kommer betalningen att läggas där direkt. Likaså så kommer föremål att prioriteras
						att plockas från trattar som pekar in i tunnan när någon köper något.
					</div>
					<img src={shop_hoppers} alt="shop with hoppers" class="h-200px" />
				</div>
			</Hotlink>
		</div>
	</PageCard>
</div>
