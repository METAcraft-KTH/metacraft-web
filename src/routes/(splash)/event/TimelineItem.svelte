<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';

    interface Props {
        name: string;
        time: string;
        icon?: string;
        left?: boolean;
        collab?: string;
        children?: import('svelte').Snippet;
    }

    let {
        name,
        time,
        icon = "https://minecraft.wiki/images/Diamond_JE3_BE3.png",
        left = true,
        collab = "",
        children
    }: Props = $props();
</script>

<style>
    :global(p) {
        line-height: 1.25;
    }
</style>

<!-- anchor element -->
<div class="relative">
    <div id={name.replaceAll(" ","_")} class="top--16 absolute"></div>
</div>

<!-- mobile -->
<div class="md:hidden flex flex-col justify-center items-center px-2 w-100%">
    <div class="bg-cerise-concrete-powder shadow-lg p-2 w-max h-max font-mc text-white text-sm text-center rd-lg">
        {time}
        {#if collab !== ""}
        <p class="text-xs">{m.timeline_collab_with({ collab })}</p>
        {/if}
    </div>
    <div class="flex justify-center items-center w-100% h-4"><div class="bg-pink-900 w-2 h-100%"></div></div>
    <div class="flex flex-1 px-2" class:justify-end={left}>
        <div class="flex flex-col gap-2 bg-white-concrete-powder shadow-lg p-4 pt-2 rd-lg">
            <h1 class="font-ten text-2xl">{name}</h1>
            {@render children?.()}
        </div>
    </div>
    <div class="flex justify-center items-center w-100% h-4"><div class="bg-pink-900 w-2 h-100%"></div></div>
</div>


<!-- desktop -->
<div class="relative w-100% max-w-[80rem]">
    <div class="hidden md:flex timelineItemDesktop" class:flex-row-reverse={!left}>
        <div class="flex flex-1 px-2" class:justify-end={left}>
            <div class="flex flex-col gap-2 bg-white-concrete-powder shadow-lg p-4 pt-2 rd-lg">
                <h1 class="mb-2 font-ten text-4xl">{name}</h1>
                {@render children?.()}
            </div>
        </div>
        <div class="flex flex-col justify-center items-center w-4rem">
            <a href={"#"+name.replaceAll(" ","_")} class="bg-cerise-concrete-powder shadow-lg p-2 w-4rem h-4rem hover:scale-110 active:scale-95 transition-transform rd-lg" class:hover:rotate-5={left} class:hover:rotate--5={!left}>
                <img src={icon} alt="icon">
            </a>
            <div class="flex-1 bg-pink-900 w-2"></div>
        </div>
        <div class="flex flex-1 px-2" class:justify-end={!left}>
            <div class="bg-cerise-concrete-powder shadow-lg p-4 w-max h-max font-mc text-white rd-lg">
                {time}
                {#if collab !== ""}
                <p class="mt-2 text-sm">{m.timeline_collab_with({ collab })}</p>
                {/if}
            </div>
        </div>
    </div>
</div>
<div class="flex justify-center items-center w-100% h-8">
    <div class="bg-pink-900 w-2 h-100%"></div>
</div>