<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';
    import Seo from '$lib/Seo.svelte';
    import Header from '$lib/layout/Header.svelte';
  </script>

<Seo title={m.nav_map()} />
  
  <Header />
  <iframe title="map" class="flex-1 w-full" src="https://map.metacraft.se/campus/?worldname=world&mapname=surface&zoom=5&x=76&y=64&z=-91"></iframe>
