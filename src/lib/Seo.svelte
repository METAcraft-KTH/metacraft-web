<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, deLocalizeHref } from '$lib/paraglide/runtime';
	import defaultImage from '$lib/images/logo_big.webp';

	/** Absolute origin — OG/Twitter crawlers reject relative image URLs. */
	const SITE = 'https://metacraft.se';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		/** Omit the " | METAcraft" suffix (front page). */
		bare?: boolean;
		type?: 'website' | 'article';
		/** ISO date, articles only. */
		published?: string;
		noindex?: boolean;
	}

	let {
		title,
		description = 'METAcraft är KTH:s Minecraft-server.',
		image = defaultImage,
		bare = false,
		type = 'website',
		published,
		noindex = false
	}: Props = $props();

	const fullTitle = $derived(!title || bare ? (title ?? 'METAcraft') : `${title} | METAcraft`);
	const absolute = (url: string) => (url.startsWith('http') ? url : SITE + url);
	const imageUrl = $derived(absolute(image));
	const path = $derived(deLocalizeHref(page.url.pathname));
	const canonical = $derived(SITE + localizeHref(path));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={SITE + localizeHref(path, { locale })} />
	{/each}

	<meta property="og:site_name" content="METAcraft" />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:url" content={canonical} />
	{#if published}
		<meta property="article:published_time" content={published} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<meta name="theme-color" content="#861043" />
</svelte:head>
