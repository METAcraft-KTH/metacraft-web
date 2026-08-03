<script lang="ts">
    import { page } from "$app/stores";
    let { icon, anchor, children } = $props();
</script>

<div class="relative p-1 text-base leading-tight transition-colors" class:bg-yellow-300={$page.url.hash === "#"+anchor}>
    <div id={anchor} class="-top-16 absolute"></div>
    <a href={`#${anchor}`} class="inline-block float-left bg-[length:100%_auto] bg-no-repeat bg-top mr-2 w-12 aspect-square hover:scale-110 active:scale-95 transition-transform" style={`background-image: url('${icon}')`}> </a>
    <div>
        {@render children?.()}
    </div>
</div>