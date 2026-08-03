<!-- @migration-task Error while migrating Svelte code: can't migrate `let now = Date.now();` to `$state` because there's a variable named state.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
    // stulen från LaunchBanner - tack martin!

	import CountdownBlock from "./CountdownBlock.svelte";

  
    let start = new Date('2025-10-27 20:00:00').getTime();
    let now = Date.now();
    let count: number;
    let s: number;
    let m: number;
    let h: number;
    let d: number;
  
    let state = 'starting';
  
    
    $: {
      if (now < start) { // before start
        state = 'starting';
        count = Math.max(Math.round((start - now) / 1000), 0);
        s = count % 60;
        m = Math.floor(count / 60) % 60;
        h = Math.floor(count / (60 * 60)) % 24;
        d = Math.floor(count / (60 * 60 * 24));
      } else {
        s, m, h, d = 0;
      }
      
    }
  
    function updateTimer() {
          now = Date.now();
      }
  
      let interval = setInterval(updateTimer, 1000);
    $: if (count <= 0) clearInterval(interval);
  </script>
  
  <div class="flex flex-col justify-center items-center bg-[#000000cc] py-[4vh] w-full text-white">
    <div class="mb-[4vh] font-mc text-[5vh]">Servern öppnar om</div>
    <div class="flex flex-row font-mc text-[16vh]">
      <CountdownBlock time={d} text="dagar" />
      :
      <CountdownBlock time={h} text="timmar" /> 
      :
      <CountdownBlock time={m} text="minuter" /> 
      :
      <CountdownBlock time={s} text="sekunder" /> 
    </div>
  </div>