<script lang="ts">
    export let href;
</script>

<a {href} class="flex-1 bg-map rd-lg p-2 flex flex-row items-center gap-4 mc7 text-black no-underline hover:translate-y--2 hover:contrast-150 transition-all leading-tight">
    <slot />
</a>