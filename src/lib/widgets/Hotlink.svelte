<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<div class="m-4">
	<a {id} href="#{id}" class="text-pink-700 hover:text-pink-900 no-underline text-xl">{title}</a>
	<div class="p-4">
		<slot />
	</div>
</div>
