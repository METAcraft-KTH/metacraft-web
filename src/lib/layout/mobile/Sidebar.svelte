<script lang="ts">
	import SideLink from './SideLink.svelte';
	import SideSubLink from './SideSubLink.svelte';
	import { m } from '$lib/paraglide/messages.js';
	interface Props {
		sideVisible: boolean;
	}

	let { sideVisible }: Props = $props();
</script>

<aside class="top-14 z-10 fixed flex flex-col bg-pink-900 w-full transition-all duration-300" class:-left-full={!sideVisible} class:left-0={sideVisible}>
	<SideLink href="/smp">{m.nav_survival()}</SideLink>
  
    <SideSubLink href="/smp/features">{m.nav_features()}</SideSubLink>
    <SideSubLink href="/smp/map">{m.nav_map()}</SideSubLink>
    <SideSubLink href="/smp#history">{m.nav_history()}</SideSubLink>
  
	<SideLink href="/campus">{m.nav_campus()}</SideLink>
	<SideLink href="/event">{m.nav_event()}</SideLink>
	<SideLink href="/install">{m.nav_voice_chat()}</SideLink>
  	<SideLink href="/rules">{m.nav_rules()}</SideLink>
	<SideLink href="/sok">{m.nav_help_us()}</SideLink>
	<!--<SideLink href="/faq">FAQ</SideLink>-->
</aside>