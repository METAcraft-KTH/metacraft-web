<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
  import Title from '$lib/layout/standard/Title.svelte';
  import Main from '$lib/layout/standard/Main.svelte';
  import { page } from '$app/stores';
</script>


<Header />
  <div class="flex-1 flex flex-col flex-items-center w-100%">
    <Title>{$page.status}</Title>
    <Main>
      <span class="text-xl">
        {#if $page.status === 404}
          Wow, that page sure doesn't exist!
        {/if}
      </span>
    </Main>
  </div>
<Footer />