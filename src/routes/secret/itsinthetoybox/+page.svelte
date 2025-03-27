<script lang="ts">
    import video from "./my-tutorial.mp4";
</script>

<div class="w-100% h-100% flex justify-center items-center">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls>
        <source src={video} type="video/mp4">
    </video>
</div>