<!-- @migration-task Error while migrating Svelte code: can't migrate `let now = Date.now();` to `$state` because there's a variable named state.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
  export let start: Date;
  export let end: Date;
  export let href: string;
  export let countdown = true;

  // stulen från LaunchBanner - tack martin!

  let now = Date.now();
  let count: number;
  let s: number;
  let m: number;
  let h: number;
  let d: number;

  let state = 'starting';

  
  $: {
    if (now < start.getTime()) { // before start
      state = 'starting';
      count = Math.max(Math.round((start.getTime() - now) / 1000), 0);
    } else if (now < end.getTime()) { // before end
      state = 'active';
      count = Math.max(Math.round((end.getTime() - now) / 1000), 0);
    } else {
      state = 'ended';
    }
    s = count % 60;
    m = Math.floor(count / 60) % 60;
    h = Math.floor(count / (60 * 60)) % 24;
    d = Math.floor(count / (60 * 60 * 24));
  }

  function updateTimer() {
		now = Date.now();
	}

	let interval = setInterval(updateTimer, 1000);
  $: if (count <= 0) clearInterval(interval);

</script>

<style>
  @keyframes loop {
    from { transform: translateX(0);     }
    to   { transform: translateX(-50%); }
  }
  .loop-container {
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .loopspan {
    display: flex;
    width: 2600px;
    animation: loop 50s infinite linear;
  }
  .inner {
    white-space: nowrap;
  }
  .reverse {
    animation-direction: reverse;
  }

  a {
    background-image: url('https://minecraft.wiki/images/Yellow_Concrete_(texture)_JE1_BE1.png');
    background-repeat: repeat;
  }
</style>

<a href={href} class="flex flex-col justify-center items-center shadow-xl my-10 w-full text-black no-underline hover:contrast-150">

  <div class="mb-2 font-ten text-yellow-700 loop-container">
    <span class="loopspan">
      {#each {length: 60} as _}
        {#if state === 'starting'}
          <span class="inner">NYTT EVENT!&nbsp;</span>
        {:else if state === 'active'}
          <span class="inner">HÄNDER JUST NU!&nbsp;</span>
        {:else}
          <span class="inner">EVENTET ÄR ÖVER!&nbsp;</span>
        {/if}
      {/each}
    </span>
  </div>


  <span class="font-ten text-5xl text-center"><slot /></span>

  <span class="text-lg text-center">
    {#if state === 'starting'}
      börjar om
    {:else if state === 'active'}
      {countdown ? 'avslutas om' : 'är LIVE just nu! Klicka här för att läsa mer!'}
    {:else}
      är avslutad!
    {/if}
  </span>

  {#if countdown && (state === 'starting' || state === 'active')}
    <div class="font-ten text-3xl">
      {d}<span class="text-base">d</span>
      {h}<span class="text-base">h</span>
      {m}<span class="text-base">m</span>
      {s}<span class="text-base">s</span>
    </div>
  {/if}


  <div class="mt-2 font-ten text-yellow-700 loop-container">
    <span class="loopspan reverse">
      {#each {length: 60} as _}
        {#if state === 'starting'}
          <span>KLICKA HÄR!&nbsp;</span>
        {:else if state === 'active'}
        <span>KLICKA HÄR!&nbsp;</span>
        {:else}
          <span class="inner">KLICKA HÄR!&nbsp;</span>
        {/if}
      {/each}
    </span>
  </div>
</a>