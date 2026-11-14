<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/Seo.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
	import OptionSwitcher from '$lib/widgets/OptionSwitcher.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import {
		API_BASE,
		TEAMS,
		itemName,
		type Recent,
		type Standings,
		type TeamDetail,
		type TeamId
	} from '$lib/evw';

	// The page itself is prerendered like the rest of the site. The scores come
	// from the API once it is open in a browser, and again every REFRESH ms.
	const REFRESH = 15_000;

	// the colours the mod gives the teams in chat: red, blue and green
	const teams: Record<TeamId, { name: () => string; bg: string; text: string }> = {
		east: { name: m.evw_team_east, bg: 'bg-red-700', text: 'text-red-700' },
		west: { name: m.evw_team_west, bg: 'bg-blue-700', text: 'text-blue-700' },
		rest: { name: m.evw_team_rest, bg: 'bg-green-700', text: 'text-green-700' }
	};

	let standings = $state<Standings | null>(null);
	let recent = $state<Recent | null>(null);
	let collection = $state<TeamDetail | null>(null);
	let selected = $state<TeamId>('east');
	let failed = $state(false);
	/** Bumped by every refresh, so the selected team's collection follows along. */
	let tick = $state(0);
	let now = $state(Date.now());

	async function get<T>(path: string): Promise<T> {
		const response = await fetch(API_BASE + path);
		if (!response.ok) throw new Error(`${path}: ${response.status}`);
		return response.json();
	}

	async function refresh() {
		try {
			[standings, recent] = await Promise.all([
				get<Standings>('/standings?top=10'),
				get<Recent>('/recent?limit=12')
			]);
			failed = false;
		} catch {
			failed = true; // what is on screen stays; the next round tries again
		}
		now = Date.now();
		tick++;
	}

	onMount(() => {
		refresh();
		const interval = setInterval(() => {
			if (!document.hidden) refresh();
		}, REFRESH);
		return () => clearInterval(interval);
	});

	$effect(() => {
		const id = selected;
		void tick;
		let stale = false;
		get<TeamDetail>(`/teams/${id}`)
			.then((detail) => {
				if (!stale) collection = detail;
			})
			.catch(() => {});
		return () => {
			stale = true;
		};
	});

	let total = $derived(standings?.teams.reduce((sum, team) => sum + team.score, 0) ?? 0);
	/** The team alone at the top, if there is one. */
	let leader = $derived.by(() => {
		if (!standings) return null;
		const best = Math.max(...standings.teams.map((team) => team.score));
		const leading = standings.teams.filter((team) => team.score === best);
		return best > 0 && leading.length === 1 ? leading[0].id : null;
	});

	const relative = new Intl.RelativeTimeFormat(getLocale(), { numeric: 'auto' });
	function ago(time: string): string {
		const seconds = Math.min(Math.round((Date.parse(time) - now) / 1000), 0);
		if (seconds > -60) return relative.format(seconds, 'second');
		if (seconds > -3600) return relative.format(Math.trunc(seconds / 60), 'minute');
		if (seconds > -86400) return relative.format(Math.trunc(seconds / 3600), 'hour');
		return relative.format(Math.trunc(seconds / 86400), 'day');
	}

	const head = (uuid: string) => `https://mc-heads.net/avatar/${uuid}/32.png`;
</script>

<Seo title={m.nav_evw()} description={m.evw_description()} />

<div class="bg-stone bg-center w-full">
	<div class="flex justify-center items-end shadow-xl mx-auto -mt-14 pb-8 lg:pb-16 w-full max-w-[80rem] h-[16rem] lg:h-[25rem] font-ten text-white splash">
		<Title>{m.evw_title()}</Title>
	</div>

	<div class="flex flex-col gap-4 mx-auto px-2 pt-4 pb-12 md:pb-24 max-w-[80rem]">
		<a href="/smp" class="font-bold text-white hover:text-[#BE185D] no-underline transition-colors">&lt; {m.features_back_to_survival()}</a>

		<p class="mx-auto mb-4 max-w-[50rem] text-white text-lg text-center leading-tight">
			<LocalizedRichText msg={m.evw_intro} />
		</p>

		{#if failed}
			<div class="bg-black px-3 py-2 border-2 border-white border-solid font-mc text-white text-center" role="status">
				{m.evw_unavailable()}
			</div>
		{/if}

		<!-- the scores -->
		<div class="flex md:flex-row flex-col gap-4">
			{#each TEAMS as id (id)}
				{@const team = standings?.teams.find((team) => team.id === id)}
				<div class="flex flex-col flex-1 items-center bg-white-concrete-powder shadow-lg rounded-lg overflow-hidden text-black">
					<div class="flex justify-center items-center gap-3 py-2 w-full font-ten text-white text-3xl md:text-4xl {teams[id].bg}">
						{teams[id].name()}
						{#if leader === id}
							<span class="bg-yellow-300 px-2 py-1 rounded font-mc text-black text-xs">{m.evw_leading()}</span>
						{/if}
					</div>
					<div class="pt-4 font-ten text-7xl md:text-8xl leading-none {teams[id].text}">
						{team?.score ?? '–'}
					</div>
					<div class="font-bold">{m.evw_score_label()}</div>
					<div class="flex flex-row flex-wrap justify-center gap-x-4 px-2 pt-2 pb-4 font-mc text-sm text-stone-700">
						<span>{m.evw_players({ count: team?.players ?? '–' })}</span>
						<span>{m.evw_registrations({ count: team?.submissions ?? '–' })}</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- each team's share of the points -->
		{#if standings && total > 0}
			<div class="flex shadow-lg border-2 border-white border-solid h-6" aria-hidden="true">
				{#each standings.teams as team (team.id)}
					<div class="transition-all duration-700 {teams[team.id].bg}" style:width="{(team.score / total) * 100}%"></div>
				{/each}
			</div>
		{/if}

		<div class="flex lg:flex-row flex-col gap-4">
			<!-- the best players -->
			<div class="flex flex-col flex-1 gap-2 bg-book p-6 min-w-0 leading-tight">
				<div class="font-ten text-2xl md:text-3xl">{m.evw_leaderboard_title()}</div>
				{#if !standings}
					<p>{failed ? '' : m.evw_loading()}</p>
				{:else}
					<ol class="flex flex-col gap-1">
						{#each standings.top as player (player.uuid)}
							<li class="flex flex-row items-center gap-3">
								<span class="w-8 font-ten text-xl text-right">{player.rank}</span>
								<img src={head(player.uuid)} alt="" width="32" height="32" loading="lazy" class="head">
								<span class="flex-1 min-w-0 font-mc truncate {teams[player.team].text}">{player.username}</span>
								<span class="font-mc text-sm whitespace-nowrap">{m.evw_items({ count: player.items })}</span>
							</li>
						{:else}
							<li>{m.evw_leaderboard_empty()}</li>
						{/each}
					</ol>
				{/if}
			</div>

			<!-- what was registered last -->
			<div class="flex flex-col flex-1 gap-2 bg-book p-6 min-w-0 leading-tight">
				<div class="font-ten text-2xl md:text-3xl">{m.evw_recent_title()}</div>
				{#if !recent}
					<p>{failed ? '' : m.evw_loading()}</p>
				{:else}
					<ul class="flex flex-col gap-1">
						{#each recent.submissions as submission (submission.player.uuid + submission.itemId)}
							<li class="flex flex-row items-center gap-3">
								<img src={head(submission.player.uuid)} alt="" width="32" height="32" loading="lazy" class="head">
								<span class="flex-1 min-w-0">
									<span class="block font-bold truncate">{itemName(submission.itemId)}</span>
									<span class="block font-mc text-sm truncate {teams[submission.team].text}">{submission.player.username}</span>
								</span>
								<span class="text-stone-500 text-sm whitespace-nowrap">{ago(submission.submittedAt)}</span>
							</li>
						{:else}
							<li>{m.evw_recent_empty()}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<!-- everything a team has collected -->
		<div class="flex flex-col bg-book p-6 leading-tight">
			<div class="mb-4 font-ten text-2xl md:text-3xl">{m.evw_collection_title()}</div>
			<div class="w-full">
				<OptionSwitcher options={[...TEAMS]} bind:selected label={(id) => teams[id].name()} />
			</div>
			{#if collection?.id !== selected}
				<p>{m.evw_loading()}</p>
			{:else if collection.items.length === 0}
				<p>{m.evw_collection_empty()}</p>
			{:else}
				<ul class="flex flex-row flex-wrap gap-1">
					{#each collection.items as item (item.itemId)}
						<li class="bg-black/10 px-2 py-1 rounded font-mc text-sm">
							{itemName(item.itemId)}
							{#if item.players > 1}
								<span class={teams[selected].text} title={m.evw_collection_shared()}>×{item.players}</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if standings}
			<p class="text-white text-sm text-center">
				{m.evw_updated({ time: new Date(standings.updatedAt).toLocaleTimeString(getLocale()) })}
			</p>
		{/if}
	</div>
</div>

<style>
	.splash {
		background-image: linear-gradient(#0005, #0005), url('$lib/images/pr_squares/trader.png');
		background-position: 50% 50%;
		background-size: cover;
	}
	.head {
		image-rendering: pixelated;
	}
</style>
