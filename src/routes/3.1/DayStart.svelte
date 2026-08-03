<script lang="ts">
  let { href, children } = $props();
</script>
<a href={'#'+href} class="block relative mt-12 mb-5 px-5 w-full text-pink-400 hover:text-pink-200 text-2xl md:text-3xl text-center transition-colors">
  <div class="-top-16 left-0 absolute" id={href}></div>
  {@render children?.()}
</a>