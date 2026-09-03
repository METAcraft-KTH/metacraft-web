<script lang="ts">
  interface Props {
    /** Import the image so Vite fingerprints it: `import bg from '$lib/images/x.png'` */
    src: string;
    /** Tint over the image: one color, or gradient stops, e.g. '#000a, #000f' */
    tint?: string;
    /** ponytail: only linear/radial are used; add more when a page needs one */
    gradient?: 'linear' | 'radial';
  }

  let { src, tint, gradient = 'linear' }: Props = $props();

  let image = $derived(
    tint
      ? `${gradient}-gradient(${tint.includes(',') ? tint : `${tint}, ${tint}`}), url("${src}")` : `url("${src}")`
  );
</script>

<div
  class="top-0 -z-10 fixed bg-cover bg-center w-lvw h-lvh"
  style:background-image={image}
></div>
