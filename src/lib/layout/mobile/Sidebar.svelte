<script lang="ts">
	import SideLink from './SideLink.svelte';
	import SideSubLink from './SideSubLink.svelte';
  export let sideVisible: boolean;
</script>

<aside class="fixed top-14 transition-all-300 w-100% bg-pink-900 flex flex-col z-10" class:left--100%={!sideVisible} class:left-0={sideVisible}>
	<SideLink href="/info">Upptäck</SideLink>
    <SideSubLink href="/tweaks">Justeringar</SideSubLink>
    <SideSubLink href="/shop">Ekonomi</SideSubLink>
    <SideSubLink href="/crafting">Crafting</SideSubLink>
    <SideSubLink href="/zones">Världszoner</SideSubLink>
    <SideSubLink href="/lore">Lore</SideSubLink>
	<SideLink href="/rules">Regler</SideLink>
	<SideLink href="/news">Nyheter</SideLink>
    <SideSubLink href="/event">Event</SideSubLink>
    <SideSubLink href="/update">Uppdateringar</SideSubLink>
	<SideLink href="/map">Live-karta</SideLink>
	<SideLink href="/faq">FAQ</SideLink>
</aside>