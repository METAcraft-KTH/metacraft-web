<script lang="ts">
    import { m } from '$lib/paraglide/messages.js';

    interface Props {
        image: any;
        icon: any;
        right?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        image,
        icon,
        right = false,
        children
    }: Props = $props();
</script>

<div class="hidden md:block bg-cover bg-center bg-fixed mx-auto w-full max-w-[150rem]" style={`background-image: url(${image})`}>
    <div class="py-8 lg:py-20 w-full h-full transition-all">
        <div class="flex mx-auto px-2 max-w-[80rem]" class:justify-end={right}>
            <div class="flex flex-row bg-white-concrete-powder shadow-lg p-8 rounded-lg max-w-[35rem]">
                <div class="relative flex flex-col gap-4">
                    <img src={icon} alt="icon"
                        class="-top-21 -right-5 absolute drop-shadow-lg w-28 rotate-5 hover:-rotate-5 active:scale-90 transition-transform">
                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="md:hidden w-full max-w-[150rem]"> <!-- MOBILE -->
    <div class="mx-auto py-4 w-full h-full transition-all">
        <div class="mx-auto px-2 max-w-[80rem]">
            <img src={image} alt={m.splashrow_image_alt()} class="rounded-t-lg w-full max-w-[35rem]" />
            <div class="flex flex-col bg-white-concrete-powder shadow-lg px-2 py-4 rounded-b-lg max-w-[35rem]">
                <div class="relative flex flex-col gap-4">
                    <img src={icon} alt="icon"
                        class="-top-15 right-0 absolute drop-shadow-lg w-16 rotate-5">
                    {@render children?.()}
                </div>
            </div>
        </div>
    </div>
</div>