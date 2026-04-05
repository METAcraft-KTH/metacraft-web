<script lang="ts">
	import HeaderSubLink from "./HeaderSubLink.svelte";
  import { slide } from 'svelte/transition';

  interface Props {
    hovered: boolean;
    elements: Array<Array<string>>;
  }

  let { hovered = $bindable(), elements }: Props = $props();
</script>

<aside transition:slide
  class="absolute left-0 top-14 transition-all-300 bg-pink-800 flex flex-col overflow-hidden"
  class:h-0={!hovered}
  onmouseover={() => hovered = true}
  onfocus={()=>{/* a11y wants an on:focus event, i guess */}}
	onmouseleave={() => hovered = false}
>
  {#each elements as item}
    <HeaderSubLink href={item[0]}>{item[1]}</HeaderSubLink>
  {/each}
</aside>