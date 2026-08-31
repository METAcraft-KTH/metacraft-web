<script lang="ts">
  import mudBricks from '$lib/images/bg/mud_bricks.png';
  interface Props {
    bg?: boolean;
    bg_texture?: string;
  }

  let { bg = true, bg_texture = mudBricks }: Props = $props();
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


<div id="footer" class="relative px-3 py-10 w-full font-bold text-white text-base text-center" class:bg-footer={bg}
  style={`background-image: linear-gradient(#0008, #0008), url("${bg_texture}");`}>
  <div class="-top-[50px] left-0 absolute flex justify-center w-full overflow-hidden">
    <span
      style={`background-image: url('${bg_texture}');
             transform: perspective(400px) rotateX(60deg) scaleX(3.085);
             background-size: 2.5%;`}
      class="inline-block w-[1920px] h-[70px] shrink-0" class:hidden={!bg}>
    </span>
  </div>
  <p class="mb-2">METAcraft ©2023-2025</p>
  <p class="mb-2">"Minecraft" samt tillhörande grafik är varumärkesregistrerat av Mojang Synergies AB</p>
  <!--<p><a href="/about" class:text-pink-300={!bg}>Om oss</a> ・ <a href="/discord" target="_blank" class:text-pink-300={!bg}>Discord-server</a> ・ <a href="/gdpr" class:text-pink-300={!bg}>GDPR Statement</a></p>-->
  <div class="flex md:flex-row flex-col justify-center items-center gap-4 sm:mt-0 text-center">
    <a href="/sok" target="_blank" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black no-underline hover:scale-105 transition-all hover:contrast-200">
      Gå med i projektgruppen
    </a>
    <a href="/discord" target="_blank" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black no-underline hover:scale-105 transition-all hover:contrast-200">
      Discord-server
    </a>
    <a href="/youtube" target="_blank" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black no-underline hover:scale-105 transition-all hover:contrast-200">
      YouTube-kanal
    </a>
    <a href="/about" class="block bg-map shadow-xl md:mt-8 px-4 py-3 rounded font-bold text-black no-underline hover:scale-105 transition-all hover:contrast-200">
      Här är alla vi!
    </a>
  </div>
</div>