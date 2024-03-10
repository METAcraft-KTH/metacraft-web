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

<div id="footer" class="text-center p-4 p-b8 w-100% text-base" class:hasbg={bg} class:text-white={!bg}>
  <p class="font-bold">redo att spela?</p>
  <div class="bg-black b-white b-2 b-solid py-1 px-3 text-center text-lg mb-3 text-white mc7 inline-block">
    mc.datasektionen.se
  </div>
  <p class="m-b2">Konglig Datasektionen ©2023-2024</p>
  <p class="m-b2">"Minecraft" samt tillhörande grafik är varumärkesregistrerat av Mojang Synergies AB</p>
  <p><a href="/about" class:text-pink-300={!bg}>Om oss</a> ・ <a href="/discord" target="_blank" class:text-pink-300={!bg}>Discord-server</a> ・ <a href="/gdpr" class:text-pink-300={!bg}>GDPR Statement</a></p>
</div>