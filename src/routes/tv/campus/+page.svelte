<!-- svelte-ignore a11y-media-has-caption -->
<script lang="ts">
    import video from "./video.mp4";
    import fallback from "./fallback.gif";
</script>

<video autoplay loop muted style="width: 100%; height: 100%">
    <source src={video} type="video/mp4">
    <!-- fallback gif -->
    <img src={fallback} alt="fallback gif">
</video>