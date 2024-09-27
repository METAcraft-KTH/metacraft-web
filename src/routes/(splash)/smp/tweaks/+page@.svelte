<script lang="ts">
    import Header from '$lib/layout/Header.svelte';
      import Footer from '$lib/layout/Footer.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import Section from './Section.svelte';
</script>
  
<Header />
<div class="w-100% flex-1 bg-bookshelf">

    <Title>SKILLNADER</Title>

    <a href="/smp" class="block w-full max-w-[79rem] mx-auto font-bold text-white mb-2 no-underline hover:text-#BE185D transition-colors">&lt; Tillbaka till Survival</a>
    <div class="flex flex-col gap-2 w-full max-w-[80rem] mx-auto bg-book p-6 mb-6 md:mb-24">
        <Section icon="https://minecraft.wiki/images/Anvil_(N)_JE3.png" anchor="anvil">
            <b>Anvil</b> ökar inte XP-kostnaden när man reparerar eller döper om ett item, och det maximala XP-kostnaden kan aldrig överstiga 39 nivåer.
            <br>
            <span class="text-sm text-stone-500">(Det betyder att <i class="italic">Mending</i> inte är lika nödvändigt som i vanilla.)</span>
        </Section>
        <Section icon="https://minecraft.wiki/images/VillagerFace.png" anchor="villager">
            <b>Villager trading</b> på servern använder <a href="https://minecraft.wiki/w/Villager_Trade_Rebalance" target="_blank">Villager Trade Rebalance</a>.
            <br>
            <span class="text-sm text-stone-500">(Vår motivering är att det uppmuntrar spelarna att bygga sina baser i olika biomer och handla med varandra.)</span>
        </Section>
        <Section icon="https://minecraft.wiki/images/Armor_Stand_%28item%29_JE2_BE2.png" anchor="statue">
            <b>Armor stand</b> kan konfigureras till att vara i olika positioner, genom att använda en bok döpt till "Statues" (stort S). <a href="https://www.youtube.com/watch?v=nV9-_RacnoI">Se här för en tutorial!</a>
        </Section>
        <Section icon="https://minecraft.wiki/images/Invicon_MHF_Chicken.png" anchor="mobhead">
            <b>Alla mobs har en chans att droppa sitt huvud</b> när den dödas av en spelare.
        </Section>
        <Section icon="https://minecraft.wiki/images/Player_Head_%28item%29_JE2.png" anchor="playerhead">
            <b>Spelare droppar alltid sitt huvud</b> när hen blir dödade av en annan spelare.
        </Section>
        <Section icon="https://minecraft.wiki/images/Baby_Cow_JE3.png" anchor="silenceme">
            <b>Mobs kan tystas</b> genom att döpa dem till "Silence me" med en nametag.
        </Section>
        <!--
        <Section icon="https://minecraft.wiki/images/Nether_Portal_(EW)_JE1.png" anchor="portal">
            <b>Netherportaler</b> kan aktiveras i vilken storlek och form du vill, inte bara rektangulär.
        </Section>
        -->
        <Section icon="https://minecraft.wiki/images/Sand_JE5_BE3.png" anchor="portal">
            <b>Sand</b> kan förnyas genom att döda Husks.
        </Section>

        <div class="text-center my-4">Och många fler! (Listan är ej färdig pga tidsbrist)</div>
    </div>

</div>
<Footer />