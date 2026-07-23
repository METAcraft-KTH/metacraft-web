<script lang="ts">
    import Header from '$lib/layout/Header.svelte';
      import Footer from '$lib/layout/Footer.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import Section from './Section.svelte';

    import shopCraft from '$lib/images/mods/shop_crafting.jpg';
    import wrenchCraft from '$lib/images/mods/wrench_crafting.png';
    import drillCrafting from '$lib/images/mods/bedrock_drill_crafting.png';
    import { m } from '$lib/paraglide/messages.js';
    import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
</script>
  
<Header />
<div class="flex-1 bg-bookshelf w-100%">

    <Title>FEATURES</Title>

    <a href="/smp" class="block mx-auto mb-2 w-full max-w-[79rem] font-bold text-white hover:text-#BE185D no-underline transition-colors">&lt; {m.features_back_to_survival()}</a>
    <div class="flex lg:flex-row flex-col gap-4 mx-auto mb-4 max-w-[80rem]">
        <div class="flex flex-col flex-1 gap-2 bg-book p-6 leading-tight">
            <div class="font-ten text-2xl md:text-3xl">PLAYER SHOPS</div>
            <p>{m.features_shops_p1()}</p>
            <img src={shopCraft} alt="shop block crafting recipe" class="max-w-[25rem]">
            <p><LocalizedRichText msg={m.features_shops_p2} /></p>
        </div>

    </div>
    <div class="flex lg:flex-row flex-col gap-4 mx-auto mb-4 max-w-[80rem]">
        <div class="flex flex-col flex-1 gap-2 bg-book p-6 leading-tight">
            <div class="font-ten text-2xl md:text-3xl">{m.features_wrench_title()}</div>
            <p>{m.features_wrench_p1()}</p>
            <img src={wrenchCraft} alt="wrench crafting recipe" class="max-w-[25rem]">
        </div>
        <div class="flex flex-col flex-1 gap-2 bg-book p-6 leading-tight">
            <div class="font-ten text-2xl md:text-3xl">{m.features_drill_title()}</div>
            <p>{m.features_drill_p1()}</p>
            <img src={drillCrafting} alt="Bedrock Drill crafting recipe" class="max-w-[25rem]">
        </div>
    </div>

    <div class="flex lg:flex-row flex-col gap-4 mx-auto mb-4 max-w-[80rem]">
        <div class="flex flex-col flex-1 gap-2 bg-book p-6">
            <div class="font-ten text-2xl md:text-3xl">{m.features_functional_title()}</div>
            <Section icon="https://minecraft.wiki/images/Anvil_(N)_JE3.png" anchor="anvil">
                <LocalizedRichText msg={m.features_anvil} />
                <br>
                <span class="text-stone-500 text-sm">(<LocalizedRichText msg={m.features_anvil_note} />)</span>
            </Section>
            <Section icon="https://minecraft.wiki/images/VillagerFace.png" anchor="villager">
                <LocalizedRichText msg={m.features_villager} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Baby_Cow_JE3.png" anchor="silenceme">
                <LocalizedRichText msg={m.features_silence} />
                <br>
                <span class="text-stone-500 text-sm">({m.features_silence_note()})</span>
            </Section>
            <Section icon="https://minecraft.wiki/images/Nether_Portal_(EW)_JE1.png" anchor="portal">
                <LocalizedRichText msg={m.features_portal} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Sand_JE5_BE3.png" anchor="sand">
                <LocalizedRichText msg={m.features_sand} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Invicon_MHF_Enderman.png" anchor="mobhead">
                <LocalizedRichText msg={m.features_enderman} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Tamed_Wolf_with_Red_Collar_JE3_BE4.png?0eac6&20240119160254" anchor="pet">
                <LocalizedRichText msg={m.features_pet} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Red_Parrot_JE1_BE1.png?90904" anchor="parrots">
                <LocalizedRichText msg={m.features_parrots} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Lead_JE2_BE2.png?955bb&20191229205413" anchor="lead">
                <LocalizedRichText msg={m.features_lead} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Minecart_JE4_BE2.png?92161" anchor="minecarts">
                <LocalizedRichText msg={m.features_minecarts} />
            </Section>
        </div>
        <div class="flex flex-col flex-1 gap-2 bg-book p-6">
            <div class="font-ten text-2xl md:text-3xl">{m.features_decorative_title()}</div>
            <Section icon="https://minecraft.wiki/images/Armor_Stand_%28item%29_JE2_BE2.png" anchor="statue">
                <LocalizedRichText msg={m.features_statue} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Invicon_MHF_Chicken.png" anchor="mobhead">
                <LocalizedRichText msg={m.features_mobhead1} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Player_Head_%28item%29_JE2.png" anchor="playerhead">
                <LocalizedRichText msg={m.features_playerhead} />
            </Section>
            <Section icon="https://minecraft.wiki/images/thumb/Wandering_Trader_JE1_BE1.png/270px-Wandering_Trader_JE1_BE1.png?62e9e" anchor="trader">
                <LocalizedRichText msg={m.features_trader} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Map_Zoom_4.png?34c38" anchor="worldgen">
                <LocalizedRichText msg={m.features_worldgen} />
            </Section>
            <Section icon="https://minecraft.wiki/images/Eye_of_Ender_JE2_BE2.png?3e29b&format=original" anchor="end">
                <LocalizedRichText msg={m.features_end} />
            </Section>
        </div>
    </div>

    <div class="flex flex-col gap-2 bg-book mx-auto mb-6 md:mb-24 p-6 w-full max-w-[80rem]">
        <div class="my-4 text-center">
            <p><LocalizedRichText msg={m.features_feedback} /></p>
        </div>
    </div>

</div>
<Footer />
