<!-- @migration-task Error while migrating Svelte code: Cannot set properties of undefined (setting 'next') -->
<!-- svelte-ignore a11y-media-has-caption -->
<script lang="ts">
    import Seo from '$lib/Seo.svelte';
    import video from "./video.mp4";
    import fallback from "./fallback.gif";
</script>

<Seo noindex />

<video autoplay loop muted style="width: 100%; height: 100%">
    <source src={video} type="video/mp4">
    <!-- fallback gif -->
    <img src={fallback} alt="fallback gif">
</video>