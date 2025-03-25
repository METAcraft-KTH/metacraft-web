<!-- svelte-ignore a11y-media-has-caption -->
<script lang="ts">
    import video from "./video.mp4";
</script>

<video autoplay loop style="width: 100%; height: 100%">
    <source src={video} type="video/mp4">
</video>