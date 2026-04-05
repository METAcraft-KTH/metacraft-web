<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>



<div class="flex flex-col items-center justify-center gap-0">
    {@render children?.()}
    <div class="w-100% justify-center items-center h-24 flex">
        <div class="w-2 h-100% bg-pink-900"></div>
    </div>
</div>