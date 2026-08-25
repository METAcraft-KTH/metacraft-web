<script lang="ts">
	import Title from '$lib/layout/standard/Title.svelte';
	import ActiveEvent from '$lib/widgets/ActiveEvent.svelte';
	import Button from '$lib/widgets/Button.svelte';

    import cavesun from '$lib/images/splashes/cavesun.webp';
    import samling from '$lib/images/splashes/smp/samling.webp';
    import oas from '$lib/images/splashes/smp/oas.webp';
	import SplashRow from './../SplashRow.svelte';
	import Post from '$lib/layout/news/Post.svelte';

	import { m } from '$lib/paraglide/messages.js';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
	import { listPosts } from '$lib/content/posts';

    // all posts, newest first, straight from the markdown frontmatter
    const history = listPosts();
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
        background-image: url('$lib/images/background-s4-water.webp');
    }
</style>

<div class="bg-stone bg-center w-full">
    <div class="flex justify-center items-end shadow-xl mx-auto -mt-14 pb-16 w-full max-w-[80rem] h-[16rem] lg:h-[25rem] font-ten text-white splash">
        <Title>SURVIVAL</Title>
    </div>

    <div class="flex flex-col items-center gap-1 mt-4 w-full text-white text-center">
        <div class="font-bold text-white text-lg">{m.smp_play_today()}</div>
        <div class="inline-block bg-black mx-1 px-3 py-1 border-2 border-white border-solid w-full max-w-[15rem] font-mc text-white text-xl">metacraft.nu</div>
        <div class="font-bold text-white text-base">{m.smp_no_mods_required()}</div>
    </div>

    <div class="flex md:flex-row flex-col gap-4 mx-auto my-12 px-4 max-w-[80rem] font-mc">
        <Button href="/smp/features">
            <img src="https://minecraft.wiki/images/Knowledge_Book_JE2.png" alt="icon" class="w-12 md:w-16">
            <span>{m.smp_everything_you_need()}</span>
        </Button>
        <Button href="/smp/map">
            <img src="https://minecraft.wiki/images/Map_Zoom_4.png" alt="icon" class="w-12 md:w-16">
            <span>{m.smp_see_map()}</span>
        </Button>
        <Button href="/install">
            <img src="https://cdn.modrinth.com/data/9eGKb6K1/icon.png" alt="icon" class="w-12 md:w-16">
            <span>{m.smp_add_voicechat()}</span>
        </Button>
    </div>

    {#if false} <!-- ? experimental design. vi kan slipa på detta mer när resten av hemsidan är redo -->
        <ActiveEvent start={new Date('2024-09-23 18:00:00')} end={new Date('2024-10-07 18:00:00')} href={'/4.0'} countdown={false}>
        SERVER LAUNCH
        </ActiveEvent>
    {/if}

    <SplashRow image={cavesun} icon="https://minecraft.wiki/images/Book_and_Quill_JE2_BE2.png">
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.smp_multiplayer_title1()}
            <br>
            <span class="text-2xl md:text-4xl">{m.smp_multiplayer_title2()}</span>
        </h1>
        <p class="text-base leading-tight">
            {m.smp_multiplayer_p1()}
        </p>
        <p class="text-base italic leading-tight">
            {m.smp_multiplayer_p2()}
        </p>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.smp_multiplayer_p3} />
        </p>
    </SplashRow>

    <SplashRow image={samling} icon="https://minecraft.wiki/images/Potion_of_Healing_JE2_BE2.png" right={true}>
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.smp_classmates_title1()}
            <br>
            <span class="text-2xl md:text-4xl"><LocalizedRichText msg={m.smp_classmates_title2} /></span>
        </h1>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.smp_classmates_p1} />
        </p>
        <p class="text-base leading-tight">
            {m.smp_classmates_p2()}
        </p>
    </SplashRow>

    <SplashRow image={oas} icon="https://minecraft.wiki/images/Flowering_Azalea_Leaves_(fast)_BE1.png">
        <h1 class="font-ten text-lg md:text-2xl leading-tight">
            {m.smp_landscape_title1()}
            <br>
            <span class="text-2xl md:text-4xl">{m.smp_landscape_title2()}</span>
        </h1>
        <p class="text-base leading-tight">
            {m.smp_landscape_p1()}
        </p>
        <p class="text-base leading-tight">
            <LocalizedRichText msg={m.smp_landscape_p2} />
        </p>
    </SplashRow>

    <div class="bg-cover bg-center bg-fixed w-full abcabc">
        <div class="flex flex-col items-center gap-4 md:gap-8 px-2 py-12 w-full h-full">
            <span class="inline bg-white shadow-xl px-3 py-2 rounded font-ten text-black text-4xl md:text-5xl text-center">
              {m.smp_watch_trailer()}
            </span>
            <div class="bg-white-concrete-powder shadow-2xl p-2 rounded w-full max-w-250">
                <iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/5KnJjiPfZQg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>

            <div class="bg-white-concrete-powder shadow-xl px-2 py-6 rounded max-w-[50rem] text-black text-lg text-center leading-tight">
                <span class="font-bold">{m.smp_ready_to_play()}</span>
                <div class="inline-block bg-black mx-1 px-3 py-1 border-2 border-white border-solid w-full max-w-[15rem] font-mc text-white text-xl">metacraft.nu</div>
                <div class="font-bold text-base">{m.smp_no_mods_required()}</div>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center gap-4 md:gap-8 bg-bookshelf px-2 py-12 pb-24">
        <div class="relative">
            <div class="-top-14 absolute" id="history"></div>
        </div>
        <span class="inline bg-white shadow-xl px-3 py-2 rounded w-max font-ten text-black text-4xl md:text-5xl text-center">
            SERVERHISTORIK
        </span>
        <div class="flex flex-col items-center gap-2 md:gap-6 mb-12 w-full max-w-300">
            {#each history as post (post.slug)}
                <Post
                    href={`/${post.slug}`}
                    title={post.title}
                    date={post.date}
                    type={post.type}
                    live={post.live}
                    latest={post.latest}
                    --image={`url(${post.imageUrl})`}
                />
            {/each}
        </div>
    </div>
</div>
