<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
	import shop_barrel from '$lib/images/mods/shop_barrel.jpg';
	import shop_config from '$lib/images/mods/shop_config.jpg';
	import shop_crafting from '$lib/images/mods/shop_crafting.jpg';
	import shop_hoppers from '$lib/images/mods/shop_hoppers.jpg';
	import shop_simple from '$lib/images/mods/shop_simple.jpg';
	import shop_trades from '$lib/images/mods/shop_trades.jpg';
	import cart_tier1 from '$lib/images/mods/cart_tier1.jpg';
	import cart_tier2 from '$lib/images/mods/cart_tier2.jpg';
	import cart_tier3 from '$lib/images/mods/cart_tier3.jpg';
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
</script>

<Title>
	MODS
</Title>
	<Main>
		<div class="max-w-250">
			<Hotlink id="voice" title="Voice chat">
				<div class="mb-8">
					Moddet <a href="https://modrinth.com/plugin/simple-voice-chat">Simple Voice Chat</a> finns installerat på servern
					för de som vill enkelt prata med varandra i spelet. Det är naturligtvis inget krav för spelarna att använda moddet: det går bra att använda
					Discord och chatten i spelet. Däremot underlättar det mycket i events och daglig spelande att kunna kommunicera med andra spelare i realtid.
				</div>

				<div class="mb-8">
					Med standardinställningarna använder man <div class="bg-gray-3 p-2px inline-block">
						CAPS LOCK
					</div>
					för push-to-talk. Inställningarna kan man ändra genom att trycka på
					<div class="bg-gray-3 p-2px inline-block">V</div>
					och grupper kan man hitta med
					<div class="bg-gray-3 p-2px inline-block">G</div>
					.
				</div>
			</Hotlink>

			<Hotlink id="carts" title="Minecarts">
				<div class="mb-8">
					På en stor server kan man resa långa sträckor för att besöka spelare, sammla resurser
					eller utforska nya områden. Uppgraderade minecarts gör resan snabbare och gör järnvägen
					till ett rimligt transportmedel i höjd med båtar på is. För att uppgradera en minecart
					till nästa nivå krävs bemästring av många resurser.
				</div>
				<div class="mb-8 flex flex-col lg:flex-row flex-justify-between gap-4 w-100%">
					<div class="flex flex-1 flex-col">
						Tier 1<br>(uppgraderar vanlig minecart)
						<img src={cart_tier1} alt="Cart tier 1" class="max-w-70 lg:w-initial pt-2" />
					</div>
					<div class="flex flex-1 flex-col">
						Tier 2<br>(uppgraderar tier 1)
						<img src={cart_tier2} alt="Cart tier 2" class="max-w-70 lg:w-initial pt-2" />
					</div>
					<div class="flex flex-1 flex-col">
						Tier 3<br>(uppgraderar tier 2)
						<img src={cart_tier3} alt="Cart tier 3" class="max-w-70 lg:w-initial pt-2" />
					</div>
				</div>
			</Hotlink>

			<Hotlink id="shops" title="Shops">
				<div class="mb-8">
					Byteshandel är en västentlig komponent på en Minecraftserver. För att fostra en eknomi med
					hög omsättning har METAcraft ett enkelt system för att sätta upp små shops för att göra
					handeln enkel och smidig.
				</div>
				<div class="mb-8 flex flex-col lg:flex-row flex-justify-between w-100%">
					<div class="mr-8">
						Börja med att konstruera ett shop-block enligt receptet. Träslag och färg på ullen är
						valfritt. Placera sedan blocket ovanpå eller på sidan av en tunna för att aktivera
						shopen.
					</div>
						<img src={shop_crafting} alt="crafting" class="inline-block max-w-70 lg:max-w-initial lg:h-50" />
						<img src={shop_simple} alt="simple shop" class="inline-block max-w-70 lg:max-w-initial lg:h-50" />
				</div>
				<div class="mb-8 flex flex-col lg:flex-row flex-justify-between w-100%">
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
					<img src={shop_config} alt="shop config" class="max-w-70 lg:max-w-initial lg:h-50" />
					<img src={shop_barrel} alt="shop barrel" class="max-w-70 lg:max-w-initial lg:h-50" />
				</div>
				<div class="mb-8 flex flex-col lg:flex-row flex-justify-between w-100%">
					<div class="mr-8">
						Spelare som interagerar med shopen eller tunnan blir presenterade en menyn med byten.
						Sakerna de köper plockas från tunnan, och betalningar läggs där med. Ägaren kan även se
						och testa bytena genom att smyga och öppna shop-blocket, och får hjälpsam information om
						de uppsatta bytena fungerar eller ej.
					</div>
					<img src={shop_trades} alt="shop trades" class="max-w-70 lg:max-w-initial lg:h-50" />
				</div>
				<div class="mb-8 flex flex-col lg:flex-row flex-justify-between w-100%">
					<div class="mr-8">
						De som vill kan automatisera affärer med trattar. Trattarna kan inte interagera med
						tunnan som en vanlig tunna, men sitter det en tratt under tunnan när ett byte genomförs
						så kommer betalningen att läggas där direkt. Likaså så kommer föremål att prioriteras
						att plockas från trattar som pekar in i tunnan när någon köper något.
					</div>
					<img src={shop_hoppers} alt="shop with hoppers" class="max-w-70 lg:max-w-initial lg:h-50" />
				</div>
			</Hotlink>
		</div>
	</Main>
