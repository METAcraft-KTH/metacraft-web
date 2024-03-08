<script lang="ts">
  export let post = false;

  let classes = !post
    ? 'titleFadeIn text-white txtshadow text-5xl md:text-7xl my-8 sm:my-12 mc10'
    : 'px-4 py-2 md:py-4 bg-white-concrete-powder text-4xl md:text-5xl mt-12 font-bold md:min-w-100';
</script>


<style>
  .stroke {
    -webkit-text-stroke: white 2px;
    text-shadow: white 0 .25rem 10px;
  }
  .txtshadow {
    text-shadow: black 0 .25rem 10px;
  }
</style>

<div class="
  mx-4 md:mx-8
  text-center
  flex flex-col {classes}"
>
  <slot />
</div>