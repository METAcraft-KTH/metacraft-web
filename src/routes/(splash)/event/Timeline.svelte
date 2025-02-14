<style>
    :global(div.timelineItemDesktop:nth-child(2n)) {
        flex-direction: row-reverse;
    }
</style>

<div class="flex flex-col items-center justify-center gap-0">
    <slot />
    <div class="w-100% justify-center items-center h-24 flex">
        <div class="w-2 h-100% bg-pink-900"></div>
    </div>
</div>