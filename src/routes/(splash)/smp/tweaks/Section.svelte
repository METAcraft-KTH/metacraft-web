<script lang="ts">
    import { page } from "$app/stores";
    export let icon;
    export let anchor;
</script>

<div class="p-1 relative transition-colors text-base leading-tight bg-op-50" class:bg-yellow-300={$page.url.hash === "#"+anchor}>
    <div id={anchor} class="absolute top--16"></div>
    <a href={`#${anchor}`} class="float-left w-[2rem] md:w-[3rem] hover:scale-110 active:scale-95 transition-transform inline-block aspect-square bg-contain mr-2 bg-no-repeat" style={`background-image: url('${icon}')`}> </a>
    <div>
        <slot />
    </div>
</div>