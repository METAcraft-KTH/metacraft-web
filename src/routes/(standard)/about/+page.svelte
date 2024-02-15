<script lang="ts">
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
  import Person from './Person.svelte';
  import credits from './credits.json';
</script>

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