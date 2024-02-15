<script lang="ts">
  export let info: Array<string>;
</script>

<div class="
  flex flex-row
  sm:flex-col sm:flex-items-center
  w-100% sm:w-33% lg:w-25%
  p-2
">
  <img src={`https://mc-heads.net/head/${info[0]}/130.png`} alt={info[1]} class="
    w-60px h-60px
    sm:w-100px sm:h-100px
    md:w-110px md:h-110px
    mr-2 sm:mr-0 sm:mb-2"
  />
  <p class="flex flex-col flex-justify-start sm:flex-items-center">
    <span class="sm:text-center font-bold mc7 text-lg sm:text-xl">{info[1]}</span>
    <span class="sm:text-center mc7 text-sm sm:mb-1"
      class:color-#AA00AA={true}>
    {info[2]}</span>
    <span class="sm:text-center sm:mb-4 md:leading-snug" class:sm:mb-8={!info[3]}>{info[3] ? info[3] : ' '}</span>
  </p>
</div>