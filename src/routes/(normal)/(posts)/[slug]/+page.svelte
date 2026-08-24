<script lang="ts">
	import Splash from '$lib/layout/standard/Splash.svelte';
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import TypeAndTime from '$lib/widgets/TypeAndTime.svelte';
	import Note from '$lib/markdown/Note.svelte';

	let { data } = $props();

	let post = $derived(data.post);
	let url = $derived(`url('${post.imageUrl}')`);
</script>

<svelte:head>
	<title>{post.title} | METAcraft</title>
</svelte:head>

<div class="flex flex-col bg-stone w-full">
	<Splash --image={url}>
		<Title post={true}>
			{post.title}
		</Title>
	</Splash>

	<Main post={true}>
		<div class="w-full text-center">
			<TypeAndTime type={post.type} date={post.date} style={'mb-6 md:mb-10'} />
		</div>

		{#if post.disclaimer}
			<Note>{@html post.disclaimer}</Note>
		{/if}

		<post.Content />
	</Main>
</div>
