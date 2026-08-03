<script lang="ts">
	import SideLink from './SideLink.svelte';
	import SideSubLink from './SideSubLink.svelte';
	interface Props {
		sideVisible: boolean;
	}

	let { sideVisible }: Props = $props();
</script>

<aside class="top-14 z-10 fixed flex flex-col bg-pink-900 w-full transition-all duration-300" class:-left-full={!sideVisible} class:left-0={sideVisible}>
	<SideLink href="/smp">Survival</SideLink>
  
    <SideSubLink href="/smp/features">Features</SideSubLink>
    <SideSubLink href="/smp/map">Världskarta</SideSubLink>
    <SideSubLink href="/smp#history">Serverhistorik</SideSubLink>
  
	<SideLink href="/campus">Campus</SideLink>
	<SideLink href="/event">Tävlingar</SideLink>
	<SideLink href="/install">Voice Chat</SideLink>
  	<SideLink href="/rules">Regler</SideLink>
	<SideLink href="/sok">Hjälp oss</SideLink>
	<!--<SideLink href="/faq">FAQ</SideLink>-->
</aside>