<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>



<div class="flex flex-col justify-center items-center gap-0">
    {@render children?.()}
    <div class="flex justify-center items-center w-full h-24">
        <div class="bg-pink-900 w-2 h-full"></div>
    </div>
</div>