<script lang="ts">
  import { onMount } from 'svelte';
  import besos from './besos.png';
  interface Props {
    info: Array<string>;
  }

  let { info }: Props = $props();
  let scrambledDescription = $state('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  function scrambleText() {
    const originalText = info[3] ?? '';
    scrambledDescription = [...originalText]
      .map((char) => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])
      .join('');
  }

  onMount(() => {
    const interval = setInterval(scrambleText, 50);
    return () => clearInterval(interval);
  });
</script>

<div class="flex flex-row sm:flex-col sm:items-center p-2 w-full sm:w-[33%] lg:w-[25%]">
  <img src={`https://render.crafty.gg/3d/bust/${info[1]}`} alt={info[1]} class="mr-2 sm:mr-0 sm:mb-2 w-[60px] sm:w-[100px] md:w-[110px] h-[60px] sm:h-[100px] md:h-[110px]"
  />
  <p class="flex min-w-0 flex-1 flex-col justify-start sm:items-center">
    <span class="font-mc font-bold text-lg sm:text-xl sm:text-center">{info[1]}</span>
    {#if info[2] === 'besos'}
      <img src={besos} alt="Besos" class="mb-1 h-5 w-5 shrink-0 object-contain"/>
      <span class="font-mc sm:mb-4 text-sm sm:text-center md:leading-snug" class:sm:mb-8={!info[3]}>{scrambledDescription || info[3] || ' '}</span>
    {:else}
      <span class="sm:mb-1 font-mc text-sm sm:text-center" class:text-[#AA00AA]={true}>
        {info[2]}
      </span>
      <span class="sm:mb-4 text-sm sm:text-center md:leading-snug" class:sm:mb-8={!info[3]}>{info[3] ? info[3] : ' '}</span>
    {/if}
  </p>
</div>