<script lang="ts">
  import chiseledCopperIcon from '$lib/images/items/chiseled_copper.png';
  import knowledgeBookIcon from '$lib/images/items/knowledge_book.png';
  import mapZoomIcon from '$lib/images/items/map_zoom_4.png';
  import woodenAxeIcon from '$lib/images/items/wooden_axe.png';
    import splashbg from '$lib/images/splashes/cavesun.webp';
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from '$lib/widgets/Button.svelte';

    import skepp from '$lib/images/splashes/main.webp';
    import samling from '$lib/images/splashes/campus/bibblan.webp';
	import SplashRow from '../SplashRow.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';

    const sessions = [
        {time: m.campus_session1_time(), place: `<a href="https://dsekt.se/desc">DESC</a>`},
        {time: m.campus_session2_time(), place: `<a href="https://metacraft.nu/discord">METAcraft</a>`}
    ]
</script>

<style>
    .splash {
        background-image: linear-gradient(
            #0005,
            #0005
        ), url('$lib/images/pr_squares/campus.png');
        background-position: 50% 50%;
        background-size: cover;
    }
</style>

<div class="bg-stone bg-center w-full">
    <div class="flex justify-center items-end shadow-xl mx-auto -mt-14 pb-16 w-full max-w-[80rem] h-[16rem] lg:h-[25rem] font-ten text-white splash">
        <Title>{m.campus_title()}</Title>
    </div>

    <div class="flex flex-col items-center gap-1 mt-4 w-full text-white text-center">
        <div class="font-bold text-white text-lg">{m.campus_coming_soon()}</div>
        <div class="inline-block bg-black mx-1 px-3 py-1 border-2 border-white border-solid w-full max-w-[20rem] font-mc text-white text-xl">campus.metacraft.nu</div>
        <div class="font-bold text-white text-base">{m.campus_join_build_night()}</div>
    </div>

    <div class="flex md:flex-row flex-col gap-4 mx-auto my-12 px-4 max-w-[80rem]">
        <Button href="/campus/detail">
            <img src={knowledgeBookIcon} alt="icon" class="w-12 md:w-16">
            <span>{m.campus_technical_details()}</span>
        </Button>
        <Button href="/campus/map">
            <img src={mapZoomIcon} alt="icon" class="w-12 md:w-16">
            <span>{m.campus_isometric_map()}</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={skepp} icon={chiseledCopperIcon}>
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.campus_dream_title1()}
            <br>
            <span class="text-2xl md:text-4xl"><LocalizedRichText msg={m.campus_dream_title2} /></span>
        </h1>
        <p class="leading-tight">
            <LocalizedRichText msg={m.campus_dream_p1} />
        </p>
        <p class="leading-tight">
            <LocalizedRichText msg={m.campus_dream_p2} />
        </p>
    </SplashRow>

    <SplashRow image={samling} icon={woodenAxeIcon} right={true}>
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.campus_teamwork_title1()}
            <br>
            <span class="text-2xl md:text-4xl"><LocalizedRichText msg={m.campus_teamwork_title2} /></span>
        </h1>
        <p class="text-base leading-tight">
            {m.campus_teamwork_p1()}
        </p>
        <p class="text-base leading-tight">
            {m.campus_teamwork_p2()}
        </p>
        <p class="text-base italic leading-tight">
            {m.campus_teamwork_p3()}
        </p>
    </SplashRow>
    
    <div class="flex flex-col items-center gap-4 md:gap-8 bg-dark-oak-planks px-2 py-12 w-full leading-tight">

        {#if false}
        <div class="flex flex-col items-center gap-4 mx-2 mb-12 md:p-10 w-full max-w-[50rem] text-base">
            <h1 class="-mt-3 font-ten text-white text-4xl md:text-5xl text-center">{m.campus_build_nights_title()}</h1>

            <p class="mb-10 px-5 text-white text-center leading-tight">{m.campus_build_nights_intro()}
            </p>
            <table class="w-full max-w-[40rem] text-white">
                <tbody>
                    <tr class="border-b-2 border-b-white border-solid font-bold text-xl">
                        <th class="w-[50%]">
                            {m.campus_build_nights_th_date()}
                        </th>
                        <th class="w-[50%]">
                            {m.campus_build_nights_th_discord()}
                        </th>
                    </tr>
                    {#each sessions as session}
                    <tr>
                        <td class="pt-4 text-center">
                            {session.time}
                        </td>
                        <td class="text-center">
                            {@html session.place}
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        {:else}
        <div class="flex flex-col items-center gap-4 mx-2 mb-12 md:p-10 w-full max-w-[50rem] text-base">
            <h2 class="font-ten text-white text-xl md:text-2xl text-center">{m.campus_join_placeholder_h2()}</h2>
            <h1 class="-mt-3 font-ten text-white text-4xl md:text-5xl text-center">{m.campus_join_placeholder_h1()}</h1>

            <p class="px-5 text-white text-center leading-tight"><LocalizedRichText msg={m.campus_join_placeholder_p} /></p>

            <a href="/sok" target="_blank" class="inline-block bg-map shadow-xl md:mt-2 px-4 py-3 w-max font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
              {m.campus_join_placeholder_cta()}
            </a>
        </div>
        {/if}

    </div>
</div>
