<script lang="ts">
  interface Props {
    info: Array<string>;
  }

  let { info }: Props = $props();
</script>

<div class="flex flex-row sm:flex-col sm:flex-items-center p-2 w-100% sm:w-33% lg:w-25%">
  <img src={`https://mc-heads.net/head/${info[0]}/130.png`} alt={info[1]} class="mr-2 sm:mr-0 sm:mb-2 w-60px sm:w-100px md:w-110px h-60px sm:h-100px md:h-110px"
  />
  <p class="flex flex-col flex-justify-start sm:flex-items-center">
    <span class="font-mc font-bold text-lg sm:text-xl sm:text-center">{info[1]}</span>
    <span class="sm:mb-1 font-mc text-sm sm:text-center"
      class:color-#AA00AA={true}>
    {info[2]}</span>
    <span class="sm:mb-4 text-sm sm:text-center md:leading-snug" class:sm:mb-8={!info[3]}>{info[3] ? info[3] : ' '}</span>
  </p>
</div>