<script lang="ts">
	import PageCard from '$lib/widgets/PageCard.svelte';
	import Hotlink from '$lib/widgets/Hotlink.svelte';
</script>

<div class="m-t40">
	<PageCard>
		<div class="p-4">
			<Hotlink id="lore" title="Lore">Lore!</Hotlink>
			<Hotlink id={'121'} title={'1.21'}>Autocrafter! Copper stuff!</Hotlink>
			<Hotlink id="wilderness" title={'Vildmarken'}>Här är det PvP!</Hotlink>
			<Hotlink id="vanillamechanics" title={'Vanilla Mechanics'}>Fabric!</Hotlink>
			<Hotlink id="shopmod" title={'Shopmod'}>Shopmod!</Hotlink>
		</div>
	</PageCard>
</div>
