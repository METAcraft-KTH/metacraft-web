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

<a href={href} class="block w-100% my-10 flex flex-col flex-justify-center flex-items-center no-underline text-black hover:contrast-150 shadow-xl">

  <div class="loop-container mc10 mb-2 text-yellow-700">
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


  <span class="mc10 text-5xl text-center"><slot /></span>

  <span class="text-lg text-center">
    {#if state === 'starting'}
      börjar om
    {:else if state === 'active'}
      {countdown ? 'avslutas om' : 'är LIVE just nu! Klicka här!'}
    {:else}
      är avslutad!
    {/if}
  </span>

  {#if countdown && (state === 'starting' || state === 'active')}
    <div class="mc10 text-3xl">
      {d}<span class="text-base">d</span>
      {h}<span class="text-base">h</span>
      {m}<span class="text-base">m</span>
      {s}<span class="text-base">s</span>
    </div>
  {/if}


  <div class="loop-container mc10 mt-2 text-yellow-700">
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