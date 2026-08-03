<script lang="ts">
  interface Props {
    left?: boolean;
    imgSrc: any;
    imgAlt: string;
    title?: import('svelte').Snippet;
    text?: import('svelte').Snippet;
  }

  let {
    left = false,
    imgSrc,
    imgAlt,
    title,
    text
  }: Props = $props();
</script>

<div class="relative sm:flex flex-row justify-center items-center mb-10 sm:mb-12">
  {#if left}
    <img src={imgSrc} alt={imgAlt} class="-left-2 xl:-left-12 float-left sm:float-none relative shadow-lg sepia-40 m-2 w-[40%] sm:w-[180px] md:w-[240px] -rotate-2 hover:-rotate-4 xl:scale-120 transition-all border-white border-4 border-solid" />
  {/if}
  {#if !left}
    <img src={imgSrc} alt={imgAlt} class="sm:hidden float-right -right-2 relative shadow-lg m-2 w-[40%] rotate-2 hover:rotate-4 transition-all border-white border-4 border-solid" />
  {/if}
  <span class="flex-2">
    <h2 class="mb-2 font-mc font-bold text-xl md:text-2xl underline decoration-3">{@render title?.()}</h2>
    {@render text?.()}
  </span>
  {#if !left}
    <img src={imgSrc} alt={imgAlt} class="hidden sm:block -top-1 -right-2 xl:-right-12 relative shadow-lg sepia-40 m-2 w-[40%] sm:w-[180px] md:w-[240px] rotate-2 hover:rotate-4 xl:scale-120 transition-all border-white border-4 border-solid" />
  {/if}
</div>