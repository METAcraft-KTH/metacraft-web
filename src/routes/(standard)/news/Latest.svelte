<script lang="ts">
  import ChevronDown from '$lib/icons/ChevronDown.svelte';

  export let href: string;
  export let title: string;
  export let name: string;
</script>

<a {href} class="no-underline text-black transition-all hover:scale-103 hover:rotate--1">
  <div class="bg-calcite max-w-120 md:min-w-80 rd flex flex-row flex-justify-between flex-items-center">
    <div class="p-4">
      <p class="text-sm font-bold">{title}</p>
      <h1 class="pl-4 text-2xl">{name}</h1>
    </div>
    <div class="h-10 mr-2 aspect-square rotate--90">
      <ChevronDown />
    </div>
  </div>
</a>