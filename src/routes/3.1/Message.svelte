<script lang="ts">
  interface Props {
    iconUUID?: string;
    iconOnLeft?: boolean;
    head?: string;
    subhead?: string;
    children?: import('svelte').Snippet;
  }

  let {
    iconUUID = "ddf3db336b394922bc55ac7709d3dc1f",
    iconOnLeft = true,
    head = "Untitled",
    subhead = "Unknown date",
    children
  }: Props = $props();
</script>

<section class="relative flex flex-row items-start mx-1 mb-3">
  {#if iconOnLeft}
    <img src={`https://mc-heads.net/avatar/${iconUUID}/64.png`} alt="playerhead" class="hidden md:block mr-3 border-2 border-pink-900 border-solid">
  {/if}
  <div class="bg-black p-3 md:p-4 pt-2 border-2 border-pink-900 border-solid w-full">
    <h1 class="font-bold text-pink-500 text-xl md:text-2xl">{head}</h1>
    <h2 class="mb-3 text-pink-700">{subhead}</h2>
    <img src={`https://mc-heads.net/avatar/${iconUUID}/40.png`} alt="playerhead" class="md:hidden block top-2 right-2 absolute" style="box-shadow: .125rem .125rem rgb(131 24 67);">
    {@render children?.()}
  </div>
  {#if !iconOnLeft}
    <img src={`https://mc-heads.net/avatar/${iconUUID}/64.png`} alt="playerhead" class="hidden md:block ml-3 border-2 border-pink-900 border-solid">
  {/if}
</section>