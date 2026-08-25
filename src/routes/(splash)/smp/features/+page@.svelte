<script lang="ts">
  import anvilIcon from '$lib/images/items/anvil.png';
  import armorStandIcon from '$lib/images/items/armor_stand.png';
  import babyCowIcon from '$lib/images/items/baby_cow.png';
  import chickenHeadIcon from '$lib/images/items/head_chicken.png';
  import endermanHeadIcon from '$lib/images/items/head_enderman.png';
  import eyeOfEnderIcon from '$lib/images/items/eye_of_ender.png';
  import leadIcon from '$lib/images/items/lead.png';
  import mapZoomIcon from '$lib/images/items/map_zoom_4.png';
  import minecartIcon from '$lib/images/items/minecart.png';
  import netherPortalIcon from '$lib/images/items/nether_portal.png';
  import parrotIcon from '$lib/images/items/red_parrot.png';
  import playerHeadIcon from '$lib/images/items/player_head.png';
  import sandIcon from '$lib/images/items/sand.png';
  import villagerIcon from '$lib/images/items/villager_face.png';
  import wanderingTraderIcon from '$lib/images/items/wandering_trader.png';
  import wolfIcon from '$lib/images/items/tamed_wolf.png';
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
<div class="flex-1 bg-bookshelf w-full">

    <Title>FEATURES</Title>

    <a href="/smp" class="block mx-auto mb-2 w-full max-w-[79rem] font-bold text-white hover:text-[#BE185D] no-underline transition-colors">&lt; {m.features_back_to_survival()}</a>
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
            <Section icon={anvilIcon} anchor="anvil">
                <LocalizedRichText msg={m.features_anvil} />
                <br>
                <span class="text-stone-500 text-sm">(<LocalizedRichText msg={m.features_anvil_note} />)</span>
            </Section>
            <Section icon={villagerIcon} anchor="villager">
                <LocalizedRichText msg={m.features_villager} />
            </Section>
            <Section icon={babyCowIcon} anchor="silenceme">
                <LocalizedRichText msg={m.features_silence} />
                <br>
                <span class="text-stone-500 text-sm">({m.features_silence_note()})</span>
            </Section>
            <Section icon={netherPortalIcon} anchor="portal">
                <LocalizedRichText msg={m.features_portal} />
            </Section>
            <Section icon={sandIcon} anchor="sand">
                <LocalizedRichText msg={m.features_sand} />
            </Section>
            <Section icon={endermanHeadIcon} anchor="mobhead">
                <LocalizedRichText msg={m.features_enderman} />
            </Section>
            <Section icon={wolfIcon} anchor="pet">
                <LocalizedRichText msg={m.features_pet} />
            </Section>
            <Section icon={parrotIcon} anchor="parrots">
                <LocalizedRichText msg={m.features_parrots} />
            </Section>
            <Section icon={leadIcon} anchor="lead">
                <LocalizedRichText msg={m.features_lead} />
            </Section>
            <Section icon={minecartIcon} anchor="minecarts">
                <LocalizedRichText msg={m.features_minecarts} />
            </Section>
        </div>
        <div class="flex flex-col flex-1 gap-2 bg-book p-6">
            <div class="font-ten text-2xl md:text-3xl">{m.features_decorative_title()}</div>
            <Section icon={armorStandIcon} anchor="statue">
                <LocalizedRichText msg={m.features_statue} />
            </Section>
            <Section icon={chickenHeadIcon} anchor="mobhead">
                <LocalizedRichText msg={m.features_mobhead1} />
            </Section>
            <Section icon={playerHeadIcon} anchor="playerhead">
                <LocalizedRichText msg={m.features_playerhead} />
            </Section>
            <Section icon={wanderingTraderIcon} anchor="trader">
                <LocalizedRichText msg={m.features_trader} />
            </Section>
            <Section icon={mapZoomIcon} anchor="worldgen">
                <LocalizedRichText msg={m.features_worldgen} />
            </Section>
            <Section icon={eyeOfEnderIcon} anchor="end">
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
