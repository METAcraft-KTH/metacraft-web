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
        {time: "Obestämd dag efter sommaren", place: `<a href="https://metacraft.nu/discord">METAcraft</a>`}
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

<div class="bg-stone bg-center w-100%">
    <div class="flex justify-center items-end shadow-xl mx-auto mt--14 pb-16 w-100% max-w-[80rem] h-16rem lg:h-25rem text-white splash mc10">
        <Title>BYGGA CAMPUS</Title>
    </div>

    <div class="flex flex-col items-center gap-1 mt-4 w-full text-white text-center">
        <div class="font-bold text-white text-lg">KOMMER SNART!</div>
        <div class="inline-block bg-black mx-1 px-3 py-1 w-full max-w-[20rem] text-white text-xl mc7 b-white b-solid b-2">campus.metacraft.nu</div>
        <div class="font-bold text-white text-base">Häng med på en byggkväll!</div>
    </div>

    <div class="flex md:flex-row flex-col gap-4 mx-auto my-12 px-4 max-w-[80rem]">
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
        <h1 class="text-lg md:text-2xl leading-tight mc10">
            DRÖMMEN OM ETT CAMPUS
            <br>
            <span class="text-2xl md:text-4xl">I EN <u class="underline-2">KUBISK VÄRLD</u></span>
        </h1>
        <p class="leading-tight">
            Du har hört talas om <a href="https://en.wikipedia.org/wiki/Build_the_Earth" target="_blank">Build the Earth</a>. Du kanske minns<sup class="text-xs vertical-super"><a href="/event#CAMPUS_BATTLE" class="no-underline">*</a></sup> att Karlsruhe Institute of Technology byggde <a href="https://campus-kit.de/" target="_blank">hela deras campus</a> i Minecraft. <a href="https://www.planetminecraft.com/project/world-of-worlds-3137794/" target="_blank">Den här grabben har byggt för många städer</a> och någon borde göra något åt det.
        </p>
        <p class="leading-tight">
            Vi är inte heller de första som försökte bygga KTH Campus i Minecraft, men vi är definitivt de som har <b>byggt bäst</b> och <b>kommit längst</b>. Den triangeln som innefattar allt från F-huset till Nymble till tunnelbaneingången är ni säkert bekanta med som <a href="/smp/map">Survivalserverns world spawn</a> i två läsår, men nu vill vi gå ett steg längre och åstadkomma något som <b>aldrig</b> gjorts tidigare: Vi vill se <b>HELA KTH Campus återskapad i Minecraft.</b>
        </p>
    </SplashRow>

    <SplashRow image={samling} icon="https://minecraft.wiki/images/Wooden_Axe_JE2_BE2.png" right={true}>
        <h1 class="text-lg md:text-2xl leading-tight mc10">
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
        <p class="text-base italic leading-tight">
            Om vi väl lyckas med projektet, så är det inte helt omöjligt att vårt arbete uppmärksammas av KTH själv...
        </p>
    </SplashRow>
    
    <div class="flex flex-col items-center gap-4 md:gap-8 bg-dark-oak-planks px-2 py-12 w-100% leading-tight">

        <div class="flex flex-col items-center gap-4 mx-2 mb-12 md:p-10 w-100% max-w-50rem text-base">
            <h1 class="mt--3 text-white text-4xl md:text-5xl text-center mc10">BYGGKVÄLLAR</h1>
            
            <p class="mb-10 px-5 text-white text-center leading-tight">Byggkvällar är det bästa (och just nu enda) sättet att bidra till projektet! Kom och chatta med andra människor medan du bygger för att få instant feedback samt tips och råd. Nedan ser du schemat för alla planerade byggkvällar (samt alla som har varit!)
            </p>
            <table class="w-100% max-w-[40rem] text-white">
                <tbody>
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
                </tbody>
            </table>
        </div>

        {#if false}
        <div class="flex flex-col items-center gap-4 mx-2 mb-12 md:p-10 w-100% max-w-50rem text-base">
            <h2 class="text-white text-xl md:text-2xl text-center mc10">här skulle jag ha förklarat hur man bidrar...</h2>
            <h1 class="mt--3 text-white text-4xl md:text-5xl text-center mc10">om det var möjligt!!!</h1>
            
            <p class="px-5 text-white text-center leading-tight">På grund av personalbrist har METAcraft-teamet just nu ingen möjlighet att aktivt driva i projektet. Om du har intresset att fixa någonting stort, kontakta oss via vår <a href="/discord" target="_blank" class="text-pink-400">Discord-server</a> omgående, eller...</p>
        
            <a href="https://forms.gle/aUhgyC99nNAQXGS37" target="_blank" class="inline-block bg-map shadow-xl md:mt-2 px-4 py-3 w-max font-bold text-black text-lg no-underline hover:scale-105 transition-all hover:contrast-200">
              Sök till projektgruppen NU!
            </a>
        </div>
        {/if}

    </div>
</div>
