<script lang="ts">
    import splashbg from '$lib/images/splashes/cavesun.webp';
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from '../Button.svelte';

    import walls from '$lib/images/splashes/event/walls.png';
    import main from '$lib/images/splashes/main.webp';
    import hexathlon1 from '$lib/images/splashes/event/hexathlon1_end.png';
	import SplashRow from '../SplashRow.svelte';
	import Timeline from './Timeline.svelte';
	import TimelineItem from './TimelineItem.svelte';
	import Ign from './IGN.svelte';
</script>

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

<div class="bg-stone w-100% bg-center">
    <div class="mx-auto splash w-100% max-w-[80rem] h-16rem lg:h-25rem mt--14 mc10 text-white flex items-end justify-center pb-16 shadow-xl">
        <Title>TÄVLINGAR</Title>
    </div>

    
    <div class="mt-4 text-white w-full flex flex-col items-center gap-1 text-center">
        {#if false}
        <div class="text-lg text-white font-bold">ANSLUT VIA</div>
        <div class="inline-block mc7 bg-black text-xl w-full max-w-[20rem] mx-1 px-3 py-1 b-white b-solid b-2 text-white">event.metacraft.nu</div>
        <div class="text-base text-white font-bold">Java 1.21.4 — Inga mods</div>
        {:else}
        <div class="text-lg text-white font-bold">NÄSTA SCHEMALAGT EVENT:</div>
        <div class="inline-block mc7 rainbowbg font-bold text-xl md:text-2xl w-full mx-1 px-3 py-1 md:py-2 w-100% text-white">CCLAN 2025</div>
        <div class="text-base text-white font-bold">Planerad april 2025</div>
        {/if}
    </div>

    <div class="mx-auto max-w-[80rem] px-4 my-12 flex flex-col md:flex-row gap-4">
        <Button href="/event/leaderboard">
            <img src="https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Se leaderboards!</span>
        </Button>
        <Button href="#timeline">
            <img src="https://minecraft.wiki/images/Book_and_Quill_JE2_BE2.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Läs om tidigare event!</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={walls} icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            MINECRAFT-MINNE
            <br>
            <span class="text-2xl md:text-4xl">FÖR <u class="underline-2">ALLA</u> SPELARE</span>
        </h1>
        <p class="text-base leading-tight">
            Inspirerade av professionella produktioner som <i>Minecraft Championships</i>, METAcrafts event strävar efter att dra upp rolighetsfaktorn till 11 med de bästa spelen vi kan komma på.
        </p>
        <p class="text-base leading-tight">
            Kom och slåss till döds i Ultra Hardcore, bygg en mural i METAplace, eller utmana varandra till en Parkour Race! Med tiotals spelare som deltar varje event, så lovar vi att det inte finns en enda tråkig stund när du spelar här!
        </p>
        <p class="text-base leading-tight">
            Oavsett hur bra du är på PVP, eller om du föredrar mindre intensiva event, så har vi säkert något för dig! Och om du mot förmodan fortfarande är missnöjd, kontakta oss på Discord, eller <a href="/sok" target="_blank">hjälp oss att bli bättre...</a>
        </p>
    </SplashRow>

    <SplashRow image={hexathlon1} icon="https://minecraft.wiki/images/Target_JE1_BE1.png" right={true}>
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            INGA KRAV ALLS,
            <br>
            <span class="text-2xl md:text-4xl">DET ÄR <u class="underline-2">BARA ATT KOMMA</u></span>
        </h1>
        <p class="text-base leading-tight">
            Till skillnad från vår <a href="/smp">survival-server</a> och <a href="/campus">"bygga campus"-projekt</a>, dessa event är helt offentliga, så du behöver <b>inte</b> vara (eller känna en) KTH-student för att delta!
        </p>
        <p class="text-base leading-tight">
            Att delta i METAcrafts event kräver inte heller någon tidsinvestering. Du behöver inte ha spelat på METAcraft förut, det är bara att ansluta sig till servern under eventet, och lämna när du vill!
        </p>
        <p class="text-base leading-tight">
            Däremot behöver alla följa <a href="/rules">reglerna</a>, så att alla trivs och ingen fuskar.
        </p>
    </SplashRow>

    <div class="w-100% bg-center-center bg-cover abcabc bg-fixed" id="timeline">
        <div class="w-100% h-100% pt-12 px-2 flex flex-col items-center gap-4 md:gap-8">
            <span class="mc10 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd">
              TIDSLINJEN
            </span>
            <Timeline>
                <TimelineItem name="MINECRAFT HEXATHLON 2" time="9 november, 2024" left={false} collab="CCLAN">
                    <p>
                        Fan-favoriten gör sin återkomst med 3 nya spel och 3 gamla!
                    </p>
                    <a href="https://cclan.se/esports/tournament/10" target="_blank">CCLAN:s inlägg och turneringsinfo</a>
                    <a href="/event/leaderboard">Leaderboard per minispel</a>
                </TimelineItem>
                <TimelineItem name="MINECRAFT HEXATHLON" time="20 april, 2024" collab="CCLAN">
                    <p>
                        Sveriges största Minecraft-minispelturnering ägde rum under CCLAN, en årlig sammanträde mellan flera svenska högskolor och universitet! Spelarna från hela landet tävlade i 6 olika solo-minispel, och samtidigt som man tävlade kunde man också samla poäng för sitt lärosäte.
                    </p>
                    <p>
                        Enligt feedbackformuläret för CCLAN var Minecraft Hexathlon den mest omtyckta av alla helgens turneringar. Det var även METAcrafts första livestreamade event, med VOD tillgänglig i länken nedan.
                    </p>
                    <a href="https://cclan.se/esports/tournament/5" target="_blank">CCLAN:s inlägg och turneringsinfo</a>
                    <a href="https://youtu.be/8o1sV7HP9dc" target="_blank">Livestream VOD</a>
                </TimelineItem>
                <TimelineItem name="CAMPUS BATTLE" time="17 april, 2024" left={false} collab="KIT">
                    <p>
                        Studenterna vid Tysklands KIT (Karlsruhe Institute of Technology) hade också byggt sitt campus i Minecraft, så naturligtvis utmanade vi dem till en minispel-turnering!
                    </p>
                    <p>
                        Detta event bestod av i princip samma minispel som Minecraft Hexathlon tre dagar senare, så det uppfyllde även syftet som en testkörning av vårt nästa event.
                    </p>
                </TimelineItem>
                <TimelineItem name="METAPLACE" time="5-11 december, 2023" icon="https://minecraft.wiki/images/Yellow_Wool_JE3_BE3.png">
                    <p>
                        Under 7 dagar fick alla spelare placera blocks i en 128x128 canvas (med en cooldown), i stil av Reddits r/place. Det fanns också dagliga uppdateringar, event och introduktion av nya blocks. Totalt placerades <b>65 501</b> blocks av <b>58</b> unika spelare under hela eventet.
                    </p>
                    <p>
                        Från och med dag 2 kunde man välja sektionstillhörlighet. Data placerade <b>40 389</b> blocks, Media placerade <b>22 841</b> blocks, och resterande <b>2 271</b> var från oidentifierade.
                    </p>
                    <p>
                        Under "data vs media"-eventet dag 5 vann Data med <b>81</b> blocks marginal (3049 vs 2968).
                    </p>
                    <a href="https://youtube.com/shorts/QHMFa096EhI" target="_blank">Officiell timelapse-video</a>
                </TimelineItem>
                <TimelineItem name="METACRAFT SURVIVAL GAMES" time="13 november, 2023" left={false} icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png">
                    <p>
                        För att fira att vi återskapade (en delmängd av) KTH Campus i Minecraft, så invigdes bygget med klassiska Survival Games-matcher som utspelar sig på just Campus! META bokades för eventet, men det var också många som deltog online.
                    </p>
                    <p>
                        Flera matcher spelades, och topp 10 bästa spelarna (samt deras poängsumma) vid kvällens slut var <Ign>Bullen13</Ign> (186), <Ign>Hynnd</Ign> (156), <Ign>Ahara</Ign> (155), <Ign>PupuOSJ</Ign> (123), <Ign>viggo003</Ign> (73), <Ign>Alleee_</Ign> (72), <Ign>hexalotl</Ign> (60), <Ign>Jonla</Ign> (59), <Ign>Benjaneb</Ign> (55), <Ign>BOT_Bond</Ign> (32).
                    </p>
                    <p>
                        Priser utdelades till de topp 5 spelarna som var på plats.
                    </p>
                </TimelineItem>
                <TimelineItem name="META UHC" time="3 oktober, 2023" icon="https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png" collab="DESC & dJubileet">
                    <p>
                        Ultra Hardcore möter META under dJubileets METAhäng: DESCathon! Vi spelade totalt fyra matcher: En solo-match som uppvärmning, följt av en solo-match och en teams-match med priser, och som avslutning en röd vs blå deathmatch utan priser.
                    </p>
                    <p>
                        <Ign>Alvinn8</Ign> tog hem segern i solo-matchen, och teams-matchen var vunnen av <Ign>Ahara</Ign>, <Ign>Hynnd</Ign> och <Ign>Plotimus</Ign>.
                    </p>
                    <a href="https://www.facebook.com/events/295533949843241" target="_blank">dJubileets Facebook-event</a>
                </TimelineItem>
            </Timeline>
        </div>
      </div>
</div>
