<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';
    import Seo from '$lib/Seo.svelte';
    import Header from '$lib/layout/Header.svelte';
  </script>

<Seo title={m.nav_map()} />
  
  <Header />
  <iframe title="map" class="flex-1 w-full" src="https://map.metacraft.se/?world=minecraft_overworld&zoom=3"></iframe>
