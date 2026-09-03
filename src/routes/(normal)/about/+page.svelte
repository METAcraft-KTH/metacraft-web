<script lang="ts">
  import Background from '$lib/layout/standard/Background.svelte';
  import bg from '$lib/images/background3.png';
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
	import Seo from '$lib/Seo.svelte';
  import Person from './Person.svelte';
  import credits from './credits.json';
  import credits_old from './credits_old.json';
  import { m } from '$lib/paraglide/messages.js';
  import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
</script>

<Seo title={m.about_title()} />

<Background src={bg} tint="#e83d8430" />

<Title>
  {m.about_title()}
</Title>
<Main>
  <p class="mb-5 text-lg text-center">
    <LocalizedRichText msg={m.about_intro} />
  </p>
  <div class="flex flex-row flex-wrap justify-center w-full">
    {#each credits as info}
      <Person {info} />
    {/each}
  </div>
</Main>
<Main>
  <p class="mb-5 text-lg text-center">
    {m.about_former_intro()}
  </p>
  <div class="flex flex-row flex-wrap justify-center w-full">
    {#each credits_old as info}
      <Person {info} />
    {/each}
  </div>
</Main>