<script lang="ts">
    interface Props {
        href: any;
        mc7?: boolean;
        children?: import('svelte').Snippet;
    }

    let { href, mc7 = true, children }: Props = $props();
</script>

<a {href} class="flex-1 bg-map rd-lg p-2 flex flex-row items-center gap-4 text-black no-underline hover:translate-y--2 hover:contrast-150 transition-all leading-tight" class:mc7={mc7}>
    {@render children?.()}
</a>