<script lang="ts">
    let { time, text } = $props();
</script>

<div class="inline-block flex flex-col items-center">
    <div class="w-19vw text-center text-#5ff">{time}</div>
    <div class="text-7vh mc7">{text}</div>
</div>