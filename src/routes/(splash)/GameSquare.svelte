<script lang="ts">
    export let img;
    export let title;
    export let link;
</script>

<a href={link} class="flex flex-1 flex-row md:flex-col md:max-w-[20rem] bg-map p-4 text-black drop-shadow-xl no-underline hover:scale-105 hover:contrast-120 transition-all">
    <div class="aspect-square sm:aspect-video bg-cover bg-center sepia-60 min-w-30% mr-2 md:mr-0" style={`background-image: url('${img}')`}></div>
    <div class="md:p-4 md:pt-2">
        <h1 class="mc10 text-2xl md:text-3xl md:mb-2">{title}</h1>
        <p><slot /></p>
    </div>
</a>