<script lang="ts">
    import video from "./my-tutorial.mp4";
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video controls style="width: 100%; height: 100%">
    <source src={video} type="video/mp4">
</video>