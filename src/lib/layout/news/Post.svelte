<script lang="ts">
  import { onMount } from 'svelte';
  import TypeAndTime from '$lib/widgets/TypeAndTime.svelte';
  import { slide } from 'svelte/transition';

  interface Props {
    href: string;
    title?: string;
    date?: string;
    type?: string;
    image: any; // intentionally unused. image link is passed as a css variable --image
    live?: boolean;
    latest?: boolean;
  }

  let {
    href,
    title = 'Unnamed',
    date = '',
    type = 'blog',
    image,
    live = false,
    latest = false
  }: Props = $props();

  let imagelink: any;

  let dateString: string;

  if (date !== '') {
    dateString = new Date(date).toLocaleDateString('sv-SE', {'weekday': 'long', 'year': 'numeric', 'month': 'short', 'day': '2-digit'});
  }
</script>

<style>
  a .icon {
    background-image: url('$lib/images/items/paper.png');
    background-size: contain;
  }
  a .icon.typeEvent {
    background-image: url('$lib/images/items/diamond.png');
  }
  a .icon.typeUpdate {
    background-image: url('$lib/images/items/ebook.png');
  }
  .banner {
    background-size: cover;
    background-position: center center;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 20% 100%);
    background-image: var(--image);
  }
  a:hover .banner {
    clip-path: polygon(5% 0, 100% 0, 100% 100%, 10% 100%);
  }
  .live {
    box-shadow: orangered 0 0 0 .25rem;
  }
  .latest {
    box-shadow: green 0 0 0 .25rem;
  }
  .live .banner::before, .latest .banner::before {
    content: 'LIVE!';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    padding: 0 .5rem .25rem;
    color: orangered;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 0 0 0 .5rem;
    transition: all ease-in-out 150ms;
  }
  .live:hover .banner::before, .latest:hover .banner::before {
    font-size: 1.75rem;
  }
  .latest .banner::before {
    content: 'SENASTE!';
    color: green;
  }
</style>

<a transition:slide {href} class="rounded-lg w-[98%] hover:w-full text-black no-underline transition-all">
  <div class="flex md:flex-row flex-col bg-wool border-3 border-white border-solid rounded w-full" class:live={live} class:latest={latest}>

    <div class="flex flex-row flex-1 items-center">

      <div class="md:m-3 mr-2 md:mr-5 w-8 md:w-12 h-8 md:h-12 icon"
      class:typeEvent={type==='event'}
      class:typeUpdate={type==='update'}
></div>

      <div class="flex flex-col flex-1 justify-center my-2">
        <h1 class="-mt-1 sm:mt-0 sm:mb-1 text-pink-800 text-lg sm:text-xl md:text-2xl leading-tight">{title}</h1>
        <TypeAndTime {type} {date} />
      </div>
    </div>
    
    <!--
    <img src={image} alt="banner" class="relative rounded-r w-[30%] md:w-[40%] h-[5rem] object-center object-cover transition-all banner">
    -->

    
    <div class="relative rounded-r w-[30%] md:w-[40%] transition-all banner"></div>
    

    <!--
    <div class="relative rounded-r w-[30%] md:w-[40%] transition-all banner">
      <img src="{image}" alt="banner" class="h-[50%] object-center object-cover banner">
    </div>
    -->
    
  </div>
</a>