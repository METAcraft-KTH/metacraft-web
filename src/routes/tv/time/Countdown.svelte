<script lang="ts">
    // stulen från LaunchBanner - tack martin!

	import CountdownBlock from "./CountdownBlock.svelte";

  
    let start = new Date('2024-09-23 18:00:00').getTime();
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
  
  <div class="bg-#000000cc w-100% py-4vh flex justify-center items-center flex-col text-white">
    <div class="mc7 text-5vh mb-4vh">Servern öppnar om</div>
    <div class="mc7 text-16vh flex flex-row">
      <CountdownBlock time={d} text="dagar" />
      :
      <CountdownBlock time={h} text="timmar" /> 
      :
      <CountdownBlock time={m} text="minuter" /> 
      :
      <CountdownBlock time={s} text="sekunder" /> 
    </div>
  </div>