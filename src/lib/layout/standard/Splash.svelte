<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<style>
  .splash, .back {
    background-image: var(--image);
    background-size: cover;
    background-position: center center;
  }
  .bl {
    background: #0004;
    backdrop-filter: blur(10px);
  }
</style>

<div class="w-full back">
  <div class="flex justify-center w-full bl">
    <div class="flex justify-center items-end w-full max-w-350 lg:max-h-85 aspect-4/1 splash">
      {@render children?.()}
    </div>
  </div>
</div>