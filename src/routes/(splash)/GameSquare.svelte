<script lang="ts">
    let {
        img,
        title,
        link,
        children
    } = $props();
</script>

<a href={link} class="flex flex-row md:flex-col flex-1 bg-map drop-shadow-xl p-4 md:max-w-[20rem] text-black no-underline hover:scale-105 transition-all hover:contrast-120">
    <div class="bg-cover bg-center sepia-60 mr-2 md:mr-0 min-w-[30%] aspect-square sm:aspect-video" style={`background-image: url('${img}')`}></div>
    <div class="md:p-4 md:pt-2">
        <h1 class="md:mb-2 font-ten text-2xl md:text-3xl">{title}</h1>
        <p>{@render children?.()}</p>
    </div>
</a>