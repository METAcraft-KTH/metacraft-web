<script lang="ts">
    import Header from '$lib/layout/Header.svelte';
      import Footer from '$lib/layout/Footer.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import Section from './Section.svelte';

    import shopCraft from '$lib/images/mods/shop_crafting.jpg';
</script>
  
<Header />
<div class="w-100% flex-1 bg-bookshelf">

    <Title>SKILLNADER</Title>

    <a href="/smp" class="block w-full max-w-[79rem] mx-auto font-bold text-white mb-2 no-underline hover:text-#BE185D transition-colors">&lt; Tillbaka till Survival</a>
    <div class="flex flex-col lg:flex-row gap-4 max-w-[80rem] mx-auto mb-4">
        <div class="flex flex-col gap-2 flex-1 bg-book p-6">
            <div class="mc10 text-2xl md:text-3xl">PLAYER SHOPS</div>
            <img src={shopCraft} alt="shop block crafting recipe" class="max-w-[25rem]">
        </div>
        <div class="flex flex-col gap-2 flex-1 bg-book p-6 leading-tight">
            <div class="mc10 text-2xl md:text-3xl">CAMPUS PLOTS</div>

            <p class="mb-2">Bakom META och biblioteket finns det 23 st plots som spelarna kan köpa. Sedan 24 september är alla plots uppköpta.</p>
            <Section icon="https://minecraft.wiki/images/Blue_Key.gif" anchor="masterkey">
                Det finns bara en enda <b>Master Key</b> för varje plot. Spelaren som har den i sin inventory kan bygga och förstöra blocks i motsvarande plot. Master Key används också för att skapa och förstöra nyckelkopior, och den droppas inte från spelaren när man dör.
            </Section>
            <Section icon="https://minecraft.wiki/images/Red_Key.gif" anchor="plotkey">
                <b>Plot Keys</b> kan craftas med vanliga material och sedan paras ihop med en Master Key. En spelare med en parade nyckel i sin inventory kan också bygga och förstöra blocks i motsvarande plot.
            </Section>
            <Section icon="https://minecraft.wiki/images/Yellow_Key.gif" anchor="pairedplotkey">
                En parade Plot Key har gul färg, annars är den röd.
            </Section>
        </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 max-w-[80rem] mx-auto mb-4">
        <div class="flex flex-col gap-2 flex-1 bg-book p-6">
            <div class="mc10 text-2xl md:text-3xl">FUNKTIONELLA ÄNDRINGAR</div>
            <Section icon="https://minecraft.wiki/images/Anvil_(N)_JE3.png" anchor="anvil">
                <b>Anvil</b> ökar inte XP-kostnaden när man reparerar eller döper om ett item, och det maximala XP-kostnaden blir aldrig högre än 39 nivåer.
                <br>
                <span class="text-sm text-stone-500">(Det betyder att <i class="italic">Mending</i> inte är lika nödvändigt som i vanilla, eftersom det inte finns en övre gräns för hur många gånger man kan reparera ett item.)</span>
            </Section>
            <Section icon="https://minecraft.wiki/images/VillagerFace.png" anchor="villager">
                <b>Villager trading</b> på servern använder <a href="https://minecraft.wiki/w/Villager_Trade_Rebalance" target="_blank">Villager Trade Rebalance</a>.
            </Section>
            <Section icon="https://minecraft.wiki/images/Baby_Cow_JE3.png" anchor="silenceme">
                <b>Mobs kan tystas</b> genom att döpa dem till "Silence me" med en nametag.
                <br>
                <span class="text-sm text-stone-500">(Det kan vara användbart för t.ex. hemliga baser.)</span>
            </Section>
            <!--
            <Section icon="https://minecraft.wiki/images/Nether_Portal_(EW)_JE1.png" anchor="portal">
                <b>Netherportaler</b> kan aktiveras i vilken storlek och form du vill, inte bara rektangulär.
            </Section>
            -->
            <Section icon="https://minecraft.wiki/images/Sand_JE5_BE3.png" anchor="portal">
                <b>Sand kan förnyas</b> genom att döda Husks (ökenzombies), som nu även spawnas i Desert Temples.
            </Section>
            <Section icon="https://minecraft.wiki/images/Invicon_MHF_Enderman.png" anchor="mobhead">
                <b>Enderman</b> kan inte plocka upp blocks.
            </Section>
        </div>
        <div class="flex flex-col gap-2 flex-1 bg-book p-6">
            <div class="mc10 text-2xl md:text-3xl">DEKORATIVA ÄNDRINGAR</div>
            <!--
            <Section icon="https://minecraft.wiki/images/Armor_Stand_%28item%29_JE2_BE2.png" anchor="statue">
                <b>Armor stand</b> kan konfigureras till att vara i olika positioner, genom att använda en bok döpt till "Statues" (stort S). <a href="https://www.youtube.com/watch?v=nV9-_RacnoI">Se här för en tutorial!</a>
            </Section>
            -->
            <Section icon="https://minecraft.wiki/images/Invicon_MHF_Chicken.png" anchor="mobhead">
                <b>Alla mobs har en chans att droppa sitt huvud</b> när den dödas av en spelare. <a href="https://wiki.vanillatweaks.net/More_Mob_Heads" target="_blank">Klicka här för exakta sannolikheter!</a>
            </Section>
            <Section icon="https://minecraft.wiki/images/Player_Head_%28item%29_JE2.png" anchor="playerhead">
                <b>Spelare droppar alltid sitt huvud</b> när hen blir dödade av en annan spelare.
            </Section>
            <Section icon="https://minecraft.wiki/images/Wandering_Trader.png" anchor="trader">
                <b>Wandering Trader</b> säljer custom mini-blocks som du kan använda för att dekorera dina bygg!
            </Section>
            <Section icon="https://minecraft.wiki/images/Map_(item)_JE2_BE2.png" anchor="worldgen">
                <b>Världgenerationen</b> använder datapacks <a href="https://modrinth.com/datapack/clifftree/gallery" target="_blank">Cliff under a Tree</a> och <a href="https://modrinth.com/datapack/wabi-sabi-structures/gallery">Wabi-Sabi Structures</a>, med några privata modifieringar från oss. De ger världen en mer unik känsla utan att påverka gameplay eller progression.
            </Section>
        </div>
    </div>

    <div class="flex flex-col gap-2 w-full max-w-[80rem] mx-auto bg-book p-6 mb-6 md:mb-24">

        

        

        <div class="text-center my-4">Och många fler! (Listan är ej färdig pga tidsbrist)</div>
    </div>

</div>
<Footer />