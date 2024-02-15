<script lang="ts">
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

<div class="back w-100%">
  <div class="bl w-100% flex flex-justify-center">
    <div class="splash w-100% max-w-350 aspect-4 lg:max-h-85 flex flex-justify-center flex-items-end">
      <slot />
    </div>
  </div>
</div>