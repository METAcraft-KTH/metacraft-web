<script lang="ts">
    import splashbg from '$lib/images/splashes/cavesun.webp';
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from '$lib/widgets/Button.svelte';

    import walls from '$lib/images/splashes/event/walls.webp';
    import hexathlon1 from '$lib/images/splashes/event/hexathlon1_end.webp';
	import SplashRow from '../SplashRow.svelte';
	import Timeline from './Timeline.svelte';
	import TimelineItem from './TimelineItem.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
</script>

<svelte:head>
    <style>

html {
    scroll-behavior: smooth;
}
    </style>
</svelte:head>

<style>
    .splash {
        background-image: linear-gradient(
            #0005,
            #0005
        ), url('$lib/images/pr_squares/pvp.png');
        background-position: 50% 50%;
        background-size: cover;
    }
    .abcabc {
        background-image: url('$lib/images/splashes/desertsea.webp');
    }
    @keyframes colorCycle {
        0%   { background-color: #971607; }
        14%  { background-color: #B4684D; }
        28%  { background-color: #DEB12D; }
        42%  { background-color: #47A036; }
        57%  { background-color: #2CBAA8; }
        71%  { background-color: #21497B; }
        85%  { background-color: #9A5CC6; }
        100% { background-color: #971607; }
    }

    .rainbowbg {
        animation: colorCycle 7s infinite linear;
    }
</style>

<div class="bg-stone bg-center w-full">
    <div class="flex justify-center items-end shadow-xl mx-auto -mt-14 pb-16 w-full max-w-[80rem] h-[16rem] lg:h-[25rem] font-ten text-white splash">
        <Title>{m.event_title()}</Title>
    </div>


    <div class="flex flex-col items-center gap-1 mt-4 w-full text-white text-center">
        {#if false}
        <div class="font-bold text-white text-lg">{m.event_connect_via()}</div>
        <div class="inline-block bg-black mx-1 px-3 py-1 border-2 border-white border-solid w-full max-w-[20rem] font-mc text-white text-xl">event.metacraft.nu</div>
        <div class="font-bold text-white text-base">{m.event_java_no_mods()}</div>
        {:else}
        <div class="font-bold text-white text-lg">{m.event_next_scheduled()}</div>
        <div class="inline-block mx-1 px-3 py-1 md:py-2 w-full w-full font-mc font-bold text-white text-xl md:text-2xl rainbowbg">???</div>
        <div class="font-bold text-white text-base">{m.event_sometime_2025()}</div>
        {/if}
    </div>

    <div class="flex md:flex-row flex-col gap-4 mx-auto my-12 px-4 max-w-[80rem]">
        <Button href="/event/leaderboard">
            <img src="https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png" alt="icon" class="w-12 md:w-16">
            <span>{m.event_see_leaderboards()}</span>
        </Button>
        <Button href="#timeline">
            <img src="https://minecraft.wiki/images/Book_and_Quill_JE2_BE2.png" alt="icon" class="w-12 md:w-16">
            <span>{m.event_read_past_events()}</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={walls} icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.event_memory_title1()}
            <br>
            <span class="text-2xl md:text-4xl"><LocalizedRichText msg={m.event_memory_title2} /></span>
        </h1>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.event_memory_p1} />
        </p>
        <p class="text-base leading-tight">
            {m.event_memory_p2()}
        </p>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.event_memory_p3} />
        </p>
    </SplashRow>

    <SplashRow image={hexathlon1} icon="https://minecraft.wiki/images/Target_JE1_BE1.png" right={true}>
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.event_norequirement_title1()}
            <br>
            <span class="text-2xl md:text-4xl"><LocalizedRichText msg={m.event_norequirement_title2} /></span>
        </h1>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.event_norequirement_p1} />
        </p>
        <p class="text-base leading-tight">
            {m.event_norequirement_p2()}
        </p>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.event_norequirement_p3} />
        </p>
    </SplashRow>

    <div class="relative bg-cover bg-center bg-fixed w-full abcabc">
        <div id="timeline" class="-top-14 absolute"></div>
        <div class="flex flex-col items-center gap-4 md:gap-8 px-2 pt-12 w-full h-full">
            <span class="inline bg-white shadow-xl px-3 py-2 rounded font-ten text-black text-4xl md:text-5xl text-center">
              {m.event_timeline_heading()}
            </span>
            <Timeline>
                <TimelineItem name="MINECRAFT HEXATHLON 4" time="20 december, 2025" left={false} collab="DESC">
                    <p>
                        {m.event_tl_hex4_p1()}
                    </p>
                    <a href="https://www.youtube.com/live/or8i6IGV9nI?si=haAmyQtKGpZgonJG" target="_blank">{m.event_tl_youtube_vod()}</a>
                </TimelineItem>
                <TimelineItem name="META-LAN ULTIMATE HARDCORE" time="20 september, 2025" collab="DESC" icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
                    <p>
                        <LocalizedRichText msg={m.event_tl_metalan_p1} />
                    </p>
                </TimelineItem>
                <TimelineItem name="SPELKVÄLL UHC" time="2 september, 2025" left={false} collab="QN & DESC" icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
                    <p>
                        {m.event_tl_spelkvall_p1()}
                    </p>
                </TimelineItem>
                <TimelineItem name="MINECRAFT HEXATHLON 3" time="7 juni, 2025" collab="DESC">
                    <p>
                        {m.event_tl_hex3_p1()}
                    </p>
                    <a href="https://www.youtube.com/live/WEndIBV22wo" target="_blank">{m.event_tl_youtube_vod()}</a>
                </TimelineItem>
                <TimelineItem name="MINECRAFT HEXATHLON 2" time="9 november, 2024" left={false} collab="CCLAN">
                    <p>
                        {m.event_tl_hex2_p1()}
                    </p>
                    <a href="https://cclan.se/esports/tournament/10" target="_blank">{m.event_tl_cclan_info()}</a>
                </TimelineItem>
                <TimelineItem name="MINECRAFT HEXATHLON" time="20 april, 2024" collab="CCLAN">
                    <p>
                        {m.event_tl_hex1_p1()}
                    </p>
                    <p>
                        {m.event_tl_hex1_p2()}
                    </p>
                    <a href="https://cclan.se/esports/tournament/5" target="_blank">{m.event_tl_cclan_info()}</a>
                    <a href="https://youtu.be/8o1sV7HP9dc" target="_blank">{m.event_tl_livestream_vod()}</a>
                </TimelineItem>
                <TimelineItem name="CAMPUS BATTLE" time="17 april, 2024" left={false} collab="KIT">
                    <p>
                        {m.event_tl_campusbattle_p1()}
                    </p>
                    <p>
                        {m.event_tl_campusbattle_p2()}
                    </p>
                </TimelineItem>
                <TimelineItem name="METAPLACE" time="5-11 december, 2023" icon="https://minecraft.wiki/images/Yellow_Wool_JE3_BE3.png">
                    <p>
                        <LocalizedRichText msg={m.event_tl_metaplace_p1} />
                    </p>
                    <p>
                        <LocalizedRichText msg={m.event_tl_metaplace_p2} />
                    </p>
                    <p>
                        <LocalizedRichText msg={m.event_tl_metaplace_p3} />
                    </p>
                    <a href="https://youtube.com/shorts/QHMFa096EhI" target="_blank">{m.event_tl_metaplace_video()}</a>
                </TimelineItem>
                <TimelineItem name="METACRAFT SURVIVAL GAMES" time="13 november, 2023" left={false} icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
                    <p>
                        {m.event_tl_survgames_p1()}
                    </p>
                    <p>
                        <LocalizedRichText msg={m.event_tl_survgames_p2} />
                    </p>
                    <p>
                        {m.event_tl_survgames_p3()}
                    </p>
                </TimelineItem>
                <TimelineItem name="META UHC" time="3 oktober, 2023" icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png" collab="DESC & dJubileet">
                    <p>
                        {m.event_tl_metauhc_p1()}
                    </p>
                    <p>
                        <LocalizedRichText msg={m.event_tl_metauhc_p2} />
                    </p>
                    <a href="https://www.facebook.com/events/295533949843241" target="_blank">{m.event_tl_facebook_event()}</a>
                </TimelineItem>
            </Timeline>
        </div>
      </div>
</div>