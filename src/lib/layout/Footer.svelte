<script lang="ts">
  export let bg = true;
</script>
<style>
  .hasbg {
    background-image: linear-gradient(
        #ffffff80, 
        #ffffff00 10%
      ), url('$lib/images/bg/smooth_quartz.png');
    background-repeat: repeat;
  }
</style>

<div id="footer" class="text-center py-10 px-3 w-100% text-base text-white font-bold" class:bg-trapdoor={bg}>
  <p class="m-b2">METAcraft ©2023-2024</p>
  <p class="m-b2">"Minecraft" samt tillhörande grafik är varumärkesregistrerat av Mojang Synergies AB</p>
  <!--<p><a href="/about" class:text-pink-300={!bg}>Om oss</a> ・ <a href="/discord" target="_blank" class:text-pink-300={!bg}>Discord-server</a> ・ <a href="/gdpr" class:text-pink-300={!bg}>GDPR Statement</a></p>-->
</div>