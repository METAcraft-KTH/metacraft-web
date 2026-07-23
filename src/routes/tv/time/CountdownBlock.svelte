<script lang="ts">
    let { time, text } = $props();
</script>

<div class="inline-block flex flex-col items-center">
    <div class="w-19vw text-#5ff text-center">{time}</div>
    <div class="font-mc text-7vh">{text}</div>
</div>