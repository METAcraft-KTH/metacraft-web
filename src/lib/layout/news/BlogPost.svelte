<script lang="ts">
  import TypeAndTime from '$lib/widgets/TypeAndTime.svelte';
  import type { Post } from '$lib/content/posts';

  interface Props {
    post: Post;
  }

  let { post }: Props = $props();
</script>

<article class="bg-book mx-auto p-8 md:p-10 rounded-xl w-full max-w-250 text-black">
  <header class="mb-6 text-center">
    <h1 class="font-ten text-3xl md:text-4xl leading-tight">
      <a href="/{post.slug}" class="text-black no-underline hover:underline">{post.title}</a>
    </h1>
    <TypeAndTime type={post.type} date={post.date} style={'mt-2 text-neutral-600'} />
  </header>

  {#if post.external}
    <!-- content is a hand-written page, so link to it instead of inlining -->
    <p class="text-center">
      <a href="/{post.slug}">Läs hela inlägget →</a>
    </p>
  {:else}
    <post.Content />
  {/if}
</article>
