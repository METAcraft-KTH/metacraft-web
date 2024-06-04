<script lang="ts">
  export let href;
  export let disabled = false;
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

<a href={disabled ? '#?' : href} class="
  inline-block text-center flex flex-col no-underline transition-colors
  flex-basis-33.3% md:flex-1 
  "
  class:pulse={!disabled}
  class:text-slate-800={disabled}
  class:cursor-default={disabled}
>
  <span class="text-3xl">{#if disabled}✖{:else}▼{/if}</span>
  <span class="md:text-xl">{#if disabled}?{:else}<slot />{/if}</span>
</a>