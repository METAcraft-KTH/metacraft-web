<script lang="ts">
  interface Props {
    href: any;
    disabled?: boolean;
    children?: import('svelte').Snippet;
  }

  let { href, disabled = false, children }: Props = $props();
</script>

<style>
  @keyframes pulse {
    from {color: #f9a8d4;}
    to   {color: #ec4899;}
  }
  .pulse {
    animation: pulse .5s infinite alternate-reverse ease-in
  }
  .pulse:hover {
    animation: none;
    color: #fbcfe8;
  }
</style>

<a href={disabled ? '#?' : href} class="flex flex-col md:flex-1 text-center no-underline transition-colors basis-[33.3%]"
  class:pulse={!disabled}
  class:text-slate-800={disabled}
  class:cursor-default={disabled}
>
  <span class="text-3xl">{#if disabled}✖{:else}▼{/if}</span>
  <span class="md:text-xl">{#if disabled}?{:else}{@render children?.()}{/if}</span>
</a>