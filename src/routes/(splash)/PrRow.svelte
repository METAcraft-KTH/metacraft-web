<script lang="ts">
  export let left = false;
  export let imgSrc: any;
  export let imgAlt: string;
</script>

<div class="relative mb-10 sm:mb-6 sm:flex flex-row flex-justify-center flex-items-center">
  {#if left}
    <img src={imgSrc} alt={imgAlt} class="relative left--2 m-2 w-40% float-left sm:float-none sm:w-180px md:w-220px xl:scale-130 xl:left--12 b-white b-4 b-solid shadow-lg rotate--2 hover:rotate--4 transition-all" />
  {/if}
  {#if !left}
    <img src={imgSrc} alt={imgAlt} class="relative right--2 m-2 w-40% float-right sm:hidden b-white b-4 b-solid shadow-lg rotate-2 hover:rotate-4 transition-all" />
  {/if}
  <span class="flex-2">
    <h2 class="mb-2 text-2xl md:text-3xl"><slot name="title" /></h2>
    <slot name="text" />
  </span>
  {#if !left}
    <img src={imgSrc} alt={imgAlt} class="relative m-2 right--2 top--1 w-40% hidden sm:block sm:w-180px md:w-220px xl:scale-130 xl:right--12 b-white b-4 b-solid shadow-lg rotate-2 hover:rotate-4 transition-all" />
  {/if}
</div>