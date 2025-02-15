<script lang="ts">
  export let bg = true;
  export let bg_texture = 'https://minecraft.wiki/images/Mud_Bricks_(texture)_JE1_BE1.png';
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


<div id="footer" class="text-center py-10 px-3 w-100% text-base text-white font-bold relative" class:bg-footer={bg}
  style={`background-image: linear-gradient(#0008, #0008), url("${bg_texture}");`}>
  <div class="overflow-hidden absolute w-100% left-0 top--50px flex justify-center">
    <span
      style={`background-image: url('${bg_texture}');
             transform: perspective(400px) rotateX(60deg) scaleX(3.085);
             background-size: 2.5%;`}
      class="w-1920px h-70px inline-block flex-shrink-0" class:hidden={!bg}>
    </span>
  </div>
  <p class="m-b2">METAcraft ©2023-2025</p>
  <p class="m-b2">"Minecraft" samt tillhörande grafik är varumärkesregistrerat av Mojang Synergies AB</p>
  <!--<p><a href="/about" class:text-pink-300={!bg}>Om oss</a> ・ <a href="/discord" target="_blank" class:text-pink-300={!bg}>Discord-server</a> ・ <a href="/gdpr" class:text-pink-300={!bg}>GDPR Statement</a></p>-->
  <div class="flex flex-col md:flex-row gap-4 text-center sm:mt-0 justify-center items-center">
    <a href="https://forms.gle/upmdop1XPzrvvuS78" target="_blank" class="bg-map block px-4 py-3 no-underline md:m-t8 rd text-black font-bold shadow-xl transition-all hover:scale-105 hover:contrast-200 rotate--2">
      Gå med i projektgruppen
    </a>
    <a href="https://discord.com/invite/MttUbkmeyD" target="_blank" class="bg-map block px-4 py-3 no-underline md:m-t8 rd text-black font-bold shadow-xl transition-all hover:scale-105 hover:contrast-200 rotate-2">
      Discord-server
    </a>
  </div>
</div>