<script lang="ts">
    import splashbg from '$lib/images/splashes/cavesun.webp';
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from '$lib/widgets/Button.svelte';

    import skepp from '$lib/images/splashes/main.webp';
    import samling from '$lib/images/splashes/campus/bibblan.webp';
	import SplashRow from '../SplashRow.svelte';

    const sessions = [
        {time: "fredag 28:e mars 2025, kl 20:00", place: `<a href="https://dsekt.se/desc">DESC</a>`},
        {time: "Obestämd dag, vecka 15", place: `<a href="https://metacraft.nu/discord">METAcraft</a>`},
        {time: "Obestämd dag, vecka 16", place: `<a href="https://metacraft.nu/discord">METAcraft</a>`}
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
    .abcabc {
        background-image: url('$lib/images/background-s4-water.webp');
    }
</style>

<div class="bg-stone w-100% bg-center">
    <div class="mx-auto splash w-100% max-w-[80rem] h-16rem lg:h-25rem mt--14 mc10 text-white flex items-end justify-center pb-16 shadow-xl">
        <Title>BYGGA CAMPUS</Title>
    </div>

    <div class="mt-4 text-white w-full flex flex-col items-center gap-1 text-center">
        <div class="text-lg text-white font-bold">KOMMER SNART!</div>
        <div class="inline-block mc7 bg-black text-xl w-full max-w-[20rem] mx-1 px-3 py-1 b-white b-solid b-2 text-white">campus.metacraft.nu</div>
        <div class="text-base text-white font-bold">Vi ses 28:e mars!</div>
    </div>

    <div class="mx-auto max-w-[80rem] px-4 my-12 flex flex-col md:flex-row gap-4">
        <Button href="/campus/detail">
            <img src="https://minecraft.wiki/images/Knowledge_Book_JE2.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Tekniska byggdetaljer! (KOMMER SNART)</span>
        </Button>
        <Button href="/campus/map">
            <img src="https://minecraft.wiki/images/Map_Zoom_4.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Isometrisk karta över campus!</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={skepp} icon="https://minecraft.wiki/images/Chiseled_Copper_JE1_BE1.png">
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            DRÖMMEN OM ETT CAMPUS
            <br>
            <span class="text-2xl md:text-4xl">I EN <u class="underline-2">KUBISK VÄRLD</u></span>
        </h1>
        <p class="leading-tight">
            Du känner till <a href="https://en.wikipedia.org/wiki/Build_the_Earth" target="_blank">Build the Earth</a>. Du kanske minns<sup class="vertical-super text-xs">1</sup> att Karlsruhe Institute of Technology byggde <a href="https://campus-kit.de/" target="_blank">deras campus</a> i Minecraft. <a href="https://www.planetminecraft.com/project/world-of-worlds-3137794/" target="_blank">Den här grabben har byggt för många städer</a> och någon borde göra något åt det.
        </p>
        <p class="leading-tight">
            Vi är inte heller de första som försökte bygga KTH Campus i Minecraft, men vi är definitivt de som har <b>byggt bäst</b> och <b>kommit längst</b>. Den triangeln som innefattar allt från F-huset till Nymble till tunnelbaneingången är ni säkert bekanta med som <a href="/smp/map">Survivalserverns world spawn</a> i två läsår, men nu vill vi gå ett steg längre och åstadkomma något som <b>aldrig</b> gjorts tidigare: Vi vill se <b>HELA KTH Campus återskapad i Minecraft.</b>
        </p>
        <p class="leading-tight text-xs italic">
            <sup class="vertical-super text-0.5rem not-italic">1</sup> från <a href="/event#CAMPUS_BATTLE">The Great Battle of Campuses 2024</a>.
        </p>
    </SplashRow>

    <SplashRow image={samling} icon="https://minecraft.wiki/images/Wooden_Axe_JE2_BE2.png" right={true}>
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            ETT GRUPPARBETE
            <br>
            <span class="text-2xl md:text-4xl">MED <u class="underline-2">HELA</u> KTH</span>
        </h1>
        <p class="text-base leading-tight">
            Först använder vi Google Maps (Street View) och Google Earth för att se till att byggnaderna är skalenliga. Sedan bygger vi insidan, bl.a. enligt offentliga planritningar. Men hur tar vi reda på inredningen, speciellt lokaler bakom stängda dörrar?
        </p>
        <p class="text-base leading-tight">
            Ingen på KTH har koll på alla lokaler, men vi kan alla en liten del av Campus som vi personligen besöker ofta. Därför behöver vi hjälp från ALLA studenter på KTH, om vi vill representera KTH "at its best" från så många vinklar som möjligt. Kanske vill du ta en extra stund och se till att din sektionslokal är extra prydligt och detaljerat?
        </p>
        <p class="text-base leading-tight italic">
            Om vi väl lyckas med projektet, så är det inte helt omöjligt att vårt arbete uppmärksammas av KTH själv...
        </p>
    </SplashRow>
    
    <div class="w-100% bg-dark-oak-planks flex flex-col items-center py-12 px-2 gap-4 md:gap-8 leading-tight">

        <div class="mx-2 mb-12 w-100% max-w-50rem md:p-10 text-base flex flex-col items-center gap-4">
            <h1 class="mc10 text-4xl md:text-5xl text-white text-center mt--3">BYGGKVÄLLAR</h1>
            
            <p class="leading-tight text-white text-center px-5 mb-10">Byggkvällar är det bästa (och just nu enda) sättet att bidra till projektet! Kom och chatta med andra människor medan du bygger för att få instant feedback samt tips och råd. Nedan ser du schemat för alla planerade byggkvällar (samt alla som har varit!)
            </p>
            <table class="text-white max-w-[40rem] w-100%">
                <tr class="font-bold text-xl b-b-white b-b-2 b-solid">
                    <th class="w-50%">
                        Datum och tid
                    </th>
                    <th class="w-50%">
                        Discord-server
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
            </table>
        </div>

        {#if false}
        <div class="mx-2 mb-12 w-100% max-w-50rem md:p-10 text-base flex flex-col items-center gap-4">
            <h2 class="mc10 text-xl md:text-2xl text-white text-center">här skulle jag ha förklarat hur man bidrar...</h2>
            <h1 class="mc10 text-4xl md:text-5xl text-white text-center mt--3">om det var möjligt!!!</h1>
            
            <p class="leading-tight text-white text-center px-5">På grund av personalbrist har METAcraft-teamet just nu ingen möjlighet att aktivt driva i projektet. Om du har intresset att fixa någonting stort, kontakta oss via vår <a href="/discord" target="_blank" class="text-pink-400">Discord-server</a> omgående, eller...</p>
        
            <a href="https://forms.gle/upmdop1XPzrvvuS78" target="_blank" class="bg-map inline-block px-4 py-3 w-max no-underline md:mt-2 text-black font-bold text-lg shadow-xl transition-all hover:scale-105 hover:contrast-200">
              Sök till projektgruppen NU!
            </a>
        </div>
        {/if}

    </div>
</div>
