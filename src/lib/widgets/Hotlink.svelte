<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<div class="m-4 relative">
	<div {id} class="absolute top--20">&nbsp;</div> <!-- so that the hotlinks respect the header height -->
	<a href="#{id}" class="text-pink-700 hover:text-pink-900 no-underline text-xl">{title}</a>
	<div class="p-4">
		<slot />
	</div>
</div>
