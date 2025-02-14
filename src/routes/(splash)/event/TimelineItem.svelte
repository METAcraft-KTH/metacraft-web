<script lang="ts">
    export let name: string;
    export let time: string;
    export let icon = "https://minecraft.wiki/images/Diamond_JE3_BE3.png";
    export let left = true;
    export let collab = "";
</script>

<style>
    :global(p) {
        line-height: 1.25;
    }
</style>

<!-- mobile -->
<div class="w-100% px-2 flex-col justify-center items-center flex md:hidden">
    <div class="bg-cerise-concrete-powder p-2 rd-lg w-max h-max mc7 text-white text-center text-sm">
        {time}
        {#if collab !== ""}
        <p class="text-xs">i samarbete med {collab}</p>
        {/if}
    </div>
    <div class="w-100% justify-center items-center h-4 flex"><div class="w-2 h-100% bg-pink-900"></div></div>
    <div class="flex-1 flex px-2" class:justify-end={left}>
        <div class="bg-white-concrete-powder p-4 pt-2 rd-lg flex flex-col gap-2">
            <h1 class="mc10 text-2xl">{name}</h1>
            <slot />
        </div>
    </div>
    <div class="w-100% justify-center items-center h-4 flex"><div class="w-2 h-100% bg-pink-900"></div></div>
</div>


<!-- desktop -->
<div class="max-w-[80rem] w-100%">
    <div class="timelineItemDesktop hidden md:flex" class:flex-row-reverse={!left}>
        <div class="flex-1 flex px-2" class:justify-end={left}>
            <div class="bg-white-concrete-powder p-4 pt-2 rd-lg flex flex-col gap-2">
                <h1 class="mc10 text-4xl mb-2">{name}</h1>
                <slot />
            </div>
        </div>
        <div class="w-4rem flex justify-center items-center flex-col">
            <div class="bg-cerise-concrete-powder w-4rem h-4rem p-2 rd-lg transition-transform hover:scale-110">
                <img src={icon} alt="icon">
            </div>
            <div class="flex-1 w-2 bg-pink-900"></div>
        </div>
        <div class="flex-1 px-2 flex" class:justify-end={!left}>
            <div class="bg-cerise-concrete-powder p-4 rd-lg w-max h-max mc7 text-white">
                {time}
                {#if collab !== ""}
                <p class="mt-2 text-sm">i samarbete med {collab}</p>
                {/if}
            </div>
        </div>
    </div>
</div>
<div class="w-100% justify-center items-center h-8 flex">
    <div class="w-2 h-100% bg-pink-900"></div>
</div>