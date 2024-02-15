<script lang="ts">
	import HeaderSubLink from "./HeaderSubLink.svelte";
  import { slide } from 'svelte/transition';

  export let hovered: boolean;
  export let elements: Array<Array<string>>;
</script>

<aside transition:slide
  class="absolute left-0 top-14 transition-all-300 bg-pink-800 flex flex-col overflow-hidden"
  class:h-0={!hovered}
  on:mouseover={() => hovered = true}
  on:focus={()=>{/* a11y wants an on:focus event, i guess */}}
	on:mouseleave={() => hovered = false}
>
  {#each elements as item}
    <HeaderSubLink href={item[0]}>{item[1]}</HeaderSubLink>
  {/each}
</aside>