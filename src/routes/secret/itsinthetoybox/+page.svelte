<script lang="ts">
	import Seo from '$lib/Seo.svelte';
    import video from "./my-tutorial.mp4";
</script>

<Seo noindex />

<div class="flex justify-center items-center w-full h-full">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video controls>
        <source src={video} type="video/mp4">
    </video>
</div>