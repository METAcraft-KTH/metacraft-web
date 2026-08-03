<!-- use this element to apply simple inline formatting to translation strings -->

<script lang="ts">
    import { ParaglideMessage } from "@inlang/paraglide-js-svelte";
    import Ign from '$lib/textstyles/IGN.svelte';
    let { msg, inputs=null } = $props();
</script>

<ParaglideMessage message={msg} inputs={inputs}>
    {#snippet b({ children })}
        <b>{@render children?.()}</b>
    {/snippet}
    {#snippet i({ children })}
        <i>{@render children?.()}</i>
    {/snippet}
    {#snippet u({ children })}
        <u>{@render children?.()}</u>
    {/snippet}
    {#snippet uu({ children })}
        <u class="decoration-2">{@render children?.()}</u>
    {/snippet}
    {#snippet ign({ children })}
        <Ign>{@render children?.()}</Ign>
    {/snippet}
    {#snippet a({ children, options })}
        {@const href = options.href as string} <!-- type annotation -->
        {#if href.startsWith('http')}
            <a {href} target="_blank">{@render children?.()}</a>
        {:else}
            <a {href}>{@render children?.()}</a>
        {/if}
    {/snippet}
</ParaglideMessage>