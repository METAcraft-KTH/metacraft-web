<script lang="ts">
    interface Props {
        href: string;
        children?: import('svelte').Snippet;
    }

    let { href, children }: Props = $props();
</script>

<a {href} class="flex flex-row flex-1 items-center gap-4 bg-map p-2 font-mc text-black no-underline leading-tight transition-all hover:-translate-y-2 rounded-lg hover:contrast-150">
    {@render children?.()}
</a>