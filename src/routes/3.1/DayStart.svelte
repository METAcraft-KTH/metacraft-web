<script lang="ts">
  export let href;
</script>
<a href={'#'+href} class="w-100% text-center text-2xl md:text-3xl text-pink-400 hover:text-pink-200 transition-colors mt-12 mb-5 px-5 block relative">
  <div class="absolute top--16 left-0" id={href} />
  <slot />
</a>