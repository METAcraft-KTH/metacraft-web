<script lang="ts">
  import { onMount } from 'svelte';
  import TypeAndTime from '$lib/widgets/TypeAndTime.svelte';
  import { slide } from 'svelte/transition';

  export let href: string;
  export let title = 'Unnamed';
  export let date = '';
  export let type = 'blog';
  export let image: any = 0; // intentionally unused. image link is passed as a css variable --image
  export let live = false;
  export let latest = false;

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

<a transition:slide {href} class="text-black no-underline rd-lg w-98% hover:w-100% transition-all">
  <div class="bg-wool w-100% flex flex-col md:flex-row rd b-3 b-white b-solid" class:live={live} class:latest={latest}>

    <div class="flex flex-row flex-1">

      <div class="icon mr-2 w-12 h-12 md:m-3 md:mr-5"
      class:typeEvent={type==='event'}
      class:typeUpdate={type==='update'}
      />

      <div class="flex-1 flex flex-col flex-justify-center my-2">
        <h1 class="text-lg sm:text-xl md:text-2xl mt--1 sm:mt-0 sm:mb-1 text-pink-800">{title}</h1>
        <TypeAndTime {type} {date} />
      </div>
    </div>
    
    <!--
    <img src={image} alt="banner" class="banner w-30% md:w-40% relative rd-r h-[5rem] object-cover object-center transition-all">
    -->

    
    <div class="banner rd-r transition-all w-30% md:w-40% relative" />
    

    <!--
    <div class="rd-r transition-all w-30% md:w-40% relative banner">
      <img src="{image}" alt="banner" class="banner h-50% object-cover object-center">
    </div>
    -->
    
  </div>
</a>