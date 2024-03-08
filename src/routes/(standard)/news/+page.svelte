<script lang="ts">
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
  import Title from '$lib/layout/standard/Title.svelte';
  import Latest from './Latest.svelte';
  import Post from './Post.svelte';
  import index from './index.json';

  let haveWeFoundLatestYet = false;
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
  <p>Om du föredrar att få informationen rakt på sak, testa <a href="/changelog">changeloggen</a>.</p>
</PageDescription>

<div class="mb-20 max-w-300 w-100% flex flex-col gap-2 md:gap-6">
  {#each index as post}
    <Post {...post} />
  {/each}
</div>