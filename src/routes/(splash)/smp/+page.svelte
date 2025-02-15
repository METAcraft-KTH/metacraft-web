<script lang="ts">
    import splashbg from '$lib/images/splashes/cavesun.webp';
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from './../Button.svelte';

    import skepp from '$lib/images/splashes/smp/skepp.png';
    import samling from '$lib/images/splashes/smp/samling.png';
    import oas from '$lib/images/splashes/smp/oas.png';
	import SplashRow from './../SplashRow.svelte';
	import Post from '$lib/layout/news/Post.svelte';

    import index from './Posts.json';

    // get (links of) all the images from the directory
    let post_images_array = Object.values(import.meta.glob('$lib/images/posts/*.{png,webp}', { eager: true, import: 'default' }));
    // create key-value pairs for each image link so i can refer to them easier
    let post_images = {};
    post_images_array.forEach((link) => {
        let index = link.match(/.+\/([a-zA-Z0-9\-_]+)\.[a-z]+/gi)[1];
        post_images[index] = link;
    });

</script>

<style>
    .splash {
        background-image: linear-gradient(
            #0005,
            #0005
        ), url('$lib/images/pr_squares/survival.png');
        background-position: 50% 50%;
        background-size: cover;
    }
    .abcabc {
        background-image: url('$lib/images/background-s4-water.png');
    }
</style>

<div class="bg-stone w-100% bg-center">
    <div class="mx-auto splash w-100% max-w-[80rem] h-16rem lg:h-25rem mt--14 mc10 text-white flex items-end justify-center pb-16 shadow-xl">
        <Title>SURVIVAL</Title>
    </div>

    <div class="mt-4 text-white w-full flex flex-col items-center gap-1 text-center">
        <div class="text-lg text-white font-bold">SPELA IDAG!</div>
        <div class="inline-block mc7 bg-black text-xl w-full max-w-[15rem] mx-1 px-3 py-1 b-white b-solid b-2 text-white">metacraft.nu</div>
        <div class="text-base text-white font-bold">Java 1.21.4 — Inga mods krävs</div>
    </div>

    <div class="mx-auto max-w-[80rem] px-4 my-12 flex flex-col md:flex-row gap-4">
        <Button href="/smp/features">
            <img src="https://minecraft.wiki/images/Knowledge_Book_JE2.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Allt du behöver veta!</span>
        </Button>
        <Button href="/smp/map">
            <img src="https://minecraft.wiki/images/Map_Zoom_4.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Se kartan över världen!</span>
        </Button>
        <Button href="/install">
            <img src="https://cdn.modrinth.com/data/9eGKb6K1/icon.png" alt="icon" class="w-3rem md:w-4rem">
            <span>Lägg till röstchatt i spelet!</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={skepp} icon="https://minecraft.wiki/images/Book_and_Quill_JE2_BE2.png">
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            VANLIG MULTIPLAYER-UPPLEVELSE
            <br>
            <span class="text-2xl md:text-4xl">I EN <u class="underline-2">OVANLIG</u> VÄRLD</span>
        </h1>
        <p class="text-base leading-tight italic">
            På jakt efter det legendariska spökskeppet "Den flygande svensken" har kapten O'Brien och hans besättning försvunnit till en främmande värld. Efter en lång resa fann de civilisation: Campus, där de har fått stanna och hjälpa till. Men när natten är lång, plågas kaptenen av <a href="https://www.youtube.com/watch?v=NA7sBWemTfs" target="_blank">samma mardröm...</a>
        </p>
        <p class="text-base leading-tight">
            <b>Här kommer du in i bilden</b> — en äventyrare som har rest hit på kaptenens uppmaning. Hjälp drottning Quristina att kartlägga världen, och hitta alla skatter och ledtrådar den gömmer. Bli en del av serverns levande historia och styr berättelsens gång genom din insats!
        </p>
    </SplashRow>

    <SplashRow image={samling} icon="https://minecraft.wiki/images/Potion_of_Healing_JE2_BE2.png" right={true}>
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            SPELA MED KLASSKAMRATER
            <br>
            <span class="text-2xl md:text-4xl">OCH <u class="underline-2">ALLA</u> DINA VÄNNER</span>
        </h1>
        <p class="text-base leading-tight">
            Servern är öppen till <span class="italic">alla KTH-studenter</span>, och dessutom får du bjuda in hur många spelare du vill från utanför KTH. Samla hela Minecraft-gänget och ge er på episka äventyr — lämna ingen utanför!
        </p>
        <p class="text-base leading-tight">
            Det är lätt att lägga till en spelare som din +1:a. Instruktioner står på skärmen för hen du ska lägga till, och båda spelare ska vara online.
        </p>
        <p class="text-base leading-tight">
            PVP och griefing är förbjudet i de flesta delar av världen, men för tävlingsinriktade spelare finns "No Man's Land", en svampö beläget vid <b>X 1500, Z -1500</b>, där PVP är tillåtet. <a href="/rules">Se till att läsa reglerna här.</a>
        </p>
    </SplashRow>

    <SplashRow image={oas} icon="https://minecraft.wiki/images/Flowering_Azalea_Leaves_(fast)_BE1.png">
        <h1 class="mc10 text-lg md:text-2xl leading-tight">
            UNIKA LANDSKAP OCH LAGAR
            <br>
            <span class="text-2xl md:text-4xl">VÄNTAR PÅ DIG</span>
        </h1>
        <p class="text-base leading-tight">
            Världen som besättningen har landat i är annorlunda från den ni är bekant med. Här hittar du fantastiska oaser, isgrottor, häpnadsväckande savanner, och så mycket mer, inte för att nämna 30+ nya strukturer för dig att utforska i alla dimensioner.
        </p>
        <p class="text-base leading-tight">
            Förutom historiska hemligheter så är världen också bunden till speciella lagar som är bra att känna till. De kan ha en påverkan på dina redstone-apparater, men man kan också utnyttja dem till sin fördel! <a href="/smp/features">Läs om alla skillnader här.</a>
        </p>
    </SplashRow>

    <div class="w-100% bg-center-center bg-cover abcabc bg-fixed">
        <div class="w-100% h-100% py-12 px-2 flex flex-col items-center gap-4 md:gap-8">
            <span class="mc10 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd">
              SE TRAILERN
            </span>
            <div class="w-100% max-w-250 bg-white-concrete-powder rd p-2 shadow-2xl">
                <iframe class="w-100% aspect-video" src="https://www.youtube-nocookie.com/embed/NA7sBWemTfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <div class="rd bg-white-concrete-powder text-black px-2 py-6 text-lg leading-tight text-center shadow-xl max-w-[50rem]">
                <span class="font-bold">Redo att spela?</span>
                <div class="inline-block mc7 bg-black text-xl w-full max-w-[15rem] mx-1 px-3 py-1 b-white b-solid b-2 text-white">metacraft.nu</div>
                <div class="text-base font-bold">Java 1.21.4 — Inga mods krävs</div>
            </div>
        </div>
    </div>

    <div class="flex flex-col items-center bg-bookshelf px-2 py-12 pb-24 gap-4 md:gap-8">
        <span class="mc10 inline bg-white text-black text-4xl md:text-5xl px-3 py-2 text-center shadow-xl rd w-max">
            SERVERHISTORIK
        </span>
        <div class="max-w-300 w-100% flex flex-col items-center mb-12 gap-2 md:gap-6">
            {#each index as post}
              <Post {...post} --image={
                post.image && post_images[post.image]                   ? "url(" + post_images[post.image] + ")" :
                post.image && post.image.startsWith("http")             ? "url(" + post.image + ")" :
                post.date && post_images[post.date.replaceAll("/","")]  ? "url(" + post_images[post.date.replaceAll("/","")] + ")" :
                "url(/src/lib/images/pr_squares/survival.png)"
                } />
            {/each}
        </div>

        <p class="text-white">
            {JSON.stringify(post_images_array)}
        </p>

    </div>
</div>
