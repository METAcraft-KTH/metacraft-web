<script lang="ts">
    import splashbg from '$lib/images/splashes/cavesun.webp';
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
</style>

<div class="bg-stone w-100% bg-center">
    <div class="mx-auto splash w-100% max-w-[80rem] h-16rem lg:h-25rem mt--14 mc10 text-white text-5xl md:text-7xl flex items-end justify-center pb-16 shadow-xl">
        <span class="titleFadeIn txtshadow">SURVIVAL SERVER</span>
    </div>

    <div class="mx-auto max-w-[80rem] px-4 my-12 flex flex-row gap-4">
        <a href="/smp/tweaks" class="flex-1 bg-white-concrete-powder rd-lg p-2 flex flex-row items-center gap-4 mc7 text-sm text-black no-underline">
            <img src="https://minecraft.wiki/images/Knowledge_Book_JE2.png" alt="icon" class="w-4rem">
            <span>Alla skillnader från vanilla</span>
        </a>
        <a href="/smp/tweaks" class="flex-1 bg-white-concrete-powder rd-lg p-2 flex flex-row items-center gap-4 mc7 text-sm text-black no-underline">
            <img src="https://minecraft.wiki/images/Map_Zoom_4.png" alt="icon" class="w-4rem">
            <span>Kartan över världen</span>
        </a>
        <a href="/smp/tweaks" class="flex-1 bg-white-concrete-powder rd-lg p-2 flex flex-row items-center gap-4 mc7 text-sm text-black no-underline">
            <img src="https://minecraft.wiki/images/Target_JE1_BE1.png" alt="icon" class="w-4rem">
            <span>Uppdateringshistorik</span>
        </a>
    </div>
</div>