<script lang="ts">
    export let image;
    export let icon;
    export let right = false;
</script>

<div class="w-full max-w-[150rem] hidden md:block bg-fixed bg-center-center bg-cover mx-auto" style={`background-image: url(${image})`}>
    <div class="w-full h-full py-8 lg:py-20 transition-all">
        <div class="mx-auto max-w-[80rem] px-2 flex" class:justify-end={right}>
            <div class="bg-white-concrete-powder max-w-[35rem] p-8 flex flex-row rd-lg shadow-lg">
                <div class="flex flex-col gap-4 relative">
                    <img src={icon} alt="icon"
                        class="w-[7rem] absolute top--21 right--5 rotate-5 drop-shadow-lg transition-transform active:scale-90 hover:rotate--5">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</div>

<div class="w-full max-w-[150rem] md:hidden"> <!-- MOBILE -->
    <div class="w-full h-full py-8 transition-all">
        <div class="mx-auto max-w-[80rem] px-2">
            <img src={image} alt="bild" class="w-full max-w-[35rem] rd-t-lg" />
            <div class="bg-white-concrete-powder max-w-[35rem] px-2 py-4 flex flex-col rd-b-lg shadow-lg">
                <div class="flex flex-col gap-4 relative">
                    <img src={icon} alt="icon"
                        class="w-[4rem] absolute top--15 right-0 rotate-5 drop-shadow-lg">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</div>