<script lang="ts">
	import SideLink from './SideLink.svelte';
	import SideSubLink from './SideSubLink.svelte';
  export let sideVisible: boolean;
</script>

<aside class="fixed top-14 transition-all-300 w-100% bg-pink-900 flex flex-col z-10" class:left--100%={!sideVisible} class:left-0={sideVisible}>
	<SideLink href="/smp">Survival</SideLink>
  <!--
    <SideSubLink href="/tweaks">Justeringar</SideSubLink>
    <SideSubLink href="/map">Världskarta</SideSubLink>
    <SideSubLink href="/lore">Lore</SideSubLink>
  -->
	<SideLink href="/campus">Campus</SideLink>
	<SideLink href="/event">Tävlingar</SideLink>
  <SideLink href="/rules">Regler</SideLink>
	<SideLink href="/about">Hjälp oss</SideLink>
	<!--<SideLink href="/faq">FAQ</SideLink>-->
</aside>