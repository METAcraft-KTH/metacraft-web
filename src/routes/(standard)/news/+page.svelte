<script lang="ts">
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
  import Title from '$lib/layout/standard/Title.svelte';
  import Latest from './Latest.svelte';
  import Post from './Post.svelte';
  //import index from './index.json';

  import img_entre from "$lib/images/splashes/entre.webp";
  import img_borgargarden from "$lib/images/splashes/borgargarden.webp";
  import img_main from "$lib/images/splashes/main.webp";

  const index = [
    {
      "href": "/3.0.2",
      "title": "3.0.2",
      "date": "2024/2/9",
      "type": "update",
      "image": img_borgargarden
    },
    {
      "href": "/3.0.1",
      "title": "3.0.1: Migration Patch",
      "date": "2024/2/2",
      "type": "update",
      "image": img_entre
    },
    {
      "href": "/3.0",
      "title": "3.0: Grand Opening",
      "date": "2023/12/26",
      "type": "update",
      "image": img_main
    }
  ]
</script>

<Title>
  NYHETER
</Title>
<!--
  <div class="flex flex-col md:flex-row gap-4">
    <Latest href={'/byggtavling'} title={'NÄSTA EVENT'} name={'Byggtävling'} />
    <Latest href={'/3.0.2'} title={'SENASTE UPPDATERING'} name={'3.0.2'} />
  </div>
-->
<PageDescription>
  <p class="mb-4">Här är en översikt av alla stora uppdateringar och events som har skett eller kommer att ske!</p>
  <p>Om du föredrar att få informationen rakt på sak, besök <a href="/changelog">changelog</a>.</p>
</PageDescription>

<div class="mb-20 max-w-300 w-100% flex flex-col gap-2 md:gap-6">
  {#each index as post}
    <Post {...post} --image={`url("${post.image}")`} />
  {/each}
</div>