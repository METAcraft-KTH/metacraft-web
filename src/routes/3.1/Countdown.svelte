<script lang="ts">
  // stulen från LaunchBanner - tack martin!

  let start = new Date('2024-06-09 19:00:00').getTime();
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
      s = 0;
      m = 0;
      h = 0;
      d = 0;
    }
    
  }

  function updateTimer() {
    now = Date.now();
	}

	let interval = setInterval(updateTimer, 1000);
  $: if (count <= 0) clearInterval(interval);
</script>

<div class="bg-#000000aa w-100% py-8 flex justify-center items-center flex-col text-white">
  <div class="mc7 text-lg md:text-xl">Kriget börjar om</div>
  <div class="mc10 text-5xl md:text-8xl">
    {d}<span class="text-2xl md:text-5xl">d</span>
    {h}<span class="text-2xl md:text-5xl">h</span>
    {m}<span class="text-2xl md:text-5xl">m</span>
    {s}<span class="text-2xl md:text-5xl">s</span>
  </div>
</div>