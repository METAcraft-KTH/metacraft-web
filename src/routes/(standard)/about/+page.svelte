<script lang="ts">
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
  import Person from './Person.svelte';
  import credits from './credits.json';
</script>

<!-- !! CUSTOM BG !! -->
<style>
	.custombg {
		background-image: linear-gradient(
        #724b4f80, 
        #724b4f80
      ), url("$lib/images/splashes/desertsea.webp")
	}
</style>
<div class="w-100lvw h-100lvh fixed top-0 z--10 custombg bg-center-center bg-cover" />
<!-- !! CUSTOM BG !! -->

<Title>
  OM OSS
</Title>
<Main>
  <p class="text-lg mb-5">
    <b>METAcraft drivs av studenter, för studenter.</b> Utan insatsen från följande fina människor skulle inget av detta finnas.
  </p>
  <div class="flex flex-row flex-wrap flex-justify-center w-100%">
    {#each credits as info}
      <Person {info} />
    {/each}
  </div>
</Main>