<script lang="ts">
  export let iconUUID = "ddf3db336b394922bc55ac7709d3dc1f";
  export let iconOnLeft = true;
  export let head: string = "Untitled";
  export let subhead: string = "Unknown date";
</script>

<section class="relative flex flex-row items-start mb-3 mx-1">
  {#if iconOnLeft}
    <img src={`https://mc-heads.net/avatar/${iconUUID}/64.png`} alt="playerhead" class="b-pink-9 b-2 b-solid hidden md:block mr-3">
  {/if}
  <div class="b-pink-9 b-2 b-solid p-3 md:p-4 pt-2 bg-black w-100%">
    <h1 class="text-pink-500 text-xl md:text-2xl font-bold">{head}</h1>
    <h2 class="text-pink-700 mb-3">{subhead}</h2>
    <img src={`https://mc-heads.net/avatar/${iconUUID}/40.png`} alt="playerhead" class="block md:hidden absolute top-2 right-2" style="box-shadow: .125rem .125rem rgb(131 24 67);">
    <slot />
  </div>
  {#if !iconOnLeft}
    <img src={`https://mc-heads.net/avatar/${iconUUID}/64.png`} alt="playerhead" class="b-pink-9 b-2 b-solid hidden md:block ml-3">
  {/if}
</section>