<script lang="ts">
	import { asset } from '$app/paths';
	import Seo from '$lib/Seo.svelte';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import BlockBackground from './BlockBackground.svelte';
	import ModelViewer from './ModelViewer.svelte';
	import ChatDemo from './ChatDemo.svelte';
	import Race from './Race.svelte';
	import { inView } from './inView';
	import { TEAMS, GOLD, itemIcon, isBlock, fullName } from './museum';

	/** The wall behind the page, top to bottom. */
	const WALL = [
		'collector_chest_3/amethyst_block',
		'collector_chest_4/lapis_block',
		'collector_chest_1/diamond_block',
		'collector_chest_2/emerald_block',
		'collector_chest_2/gold_block',
		'collector_chest_4/redstone_block',
		'collector_chest_5/crying_obsidian',
		'collector_chest_1/netherite_block'
	].map((t) => asset(`/museum/models/${t}.png`));

	const BURST = 16;
	const burst = Array.from({ length: BURST }, (_, i) => {
		const a = (i / BURST) * Math.PI * 2 + 0.3;
		return { i, x: Math.cos(a), y: Math.sin(a), spin: (i % 2 ? 1 : -1) * (8 + (i % 5) * 3) };
	});

	const RUNNERS_UP = [
		{ rank: 2, color: '#D8D8D8' },
		{ rank: 3, color: '#CD7F32' },
		{ rank: 4, color: '#B57BFF' },
		{ rank: 5, color: '#B57BFF' }
	];

	let demoTeam = $state(0);

	const COMMAND = '/museum join';
	let copied = $state(false);
	async function copyCommand() {
		await navigator.clipboard.writeText(COMMAND);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	const scrollDown = () =>
		document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' });
</script>

<Seo
	title="Museum Showdown 2026"
	description="The Best West, the Humble East and the Sophisticated South race to register the most different items with the Item Collector, and you keep every item you bring. The winning team gets the Ender Chest Lid, and the top 5 collectors win their own Collector Chest. Pick your side: /museum join"
	image="/museum/poster.jpg"
/>

<Header splashPage={true} />

<div class="museum" style:--gold={GOLD}>
	<BlockBackground textures={WALL} />

	<!-- ───────────── HERO ───────────── -->
	<section class="hero">
		<div class="glow" aria-hidden="true"></div>

		<div class="burst" aria-hidden="true">
			{#each burst as b (b.i)}
				<span class="orbit" style:--x={b.x} style:--y={b.y} style:--d="{b.i * 25}ms">
					<img
						src={itemIcon(b.i)}
						alt=""
						class:block={isBlock(b.i)}
						style:--spin="{b.spin}deg"
					/>
				</span>
			{/each}
		</div>

		<div class="hero-copy">
			<h1>
				<span class="title">Museum Showdown</span>
				<span class="year">2026</span>
			</h1>

			<div class="versus">
				{#each TEAMS as team, i (team.name)}
					{#if i > 0}<span class="vs" style:--i={i}>VS</span>{/if}
					<div class="team-card" style:--i={i} style:--c1={team.color} style:--c2={team.dark}>
						<span class="epithet">The {team.epithet}</span>
						<span class="direction">{team.name}</span>
					</div>
				{/each}
			</div>

			<a class="font-ten scoreboard tagline" href="/smp/museum">SEE THE SCOREBOARD</a>
		</div>

		<button class="scroll-hint" onclick={scrollDown} aria-label="Scroll to how to play">
			<ChevronDown />
		</button>
	</section>

	<!-- ───────────── HOW TO PLAY ───────────── -->
	<section id="how-to-play" class="wide-right section split reveal" {@attach inView()}>
		<div class="copy">
			<span class="step">01</span>
			<h2>Bring any item to the <em>Item Collector</em> at spawn</h2>
			<p class="lead">The item is kept, so you can submit your best gear too!</p>
			<div class="team-toggle" role="group" aria-label="Show the chat as team">
				{#each TEAMS as team, i (team.name)}
					<button
						style:--c={team.color}
						aria-pressed={demoTeam === i}
						onclick={() => (demoTeam = i)}>{fullName(team)}</button
					>
				{/each}
			</div>
		</div>
		<div class="stage">
			<ChatDemo team={TEAMS[demoTeam]} />
			<p class="fine">Example chat. Numbers are for illustration.</p>
		</div>
	</section>

	<!-- ───────────── SCORING ───────────── -->
	<section class="section reveal" {@attach inView()}>
		<div class="copy centered">
			<span class="step">02</span>
			<h2>Every <em>different</em> item scores for your team</h2>
			<p class="lead">
				Every distinct item counts once for yourself and your team, so different names or enchants don't count. Most varied collection wins!
			</p>
		</div>
		<Race />
	</section>

	<!-- ───────────── TEAM PRIZE ───────────── -->
	<section class="section split reveal" {@attach inView()}>
		<div class="copy">
			<span class="step">03</span>
			<h2>The winning team gets the <em>Ender Chest Lid</em></h2>
			<p class="lead">
				Every item that's new for your team brings it one step closer to the Ender Chest Lid, <strong>a hat you can put on your head.</strong>
			</p>
			<p class="lead rivals">
				Will it be
				{#each TEAMS as team, i (team.name)}<span style:color={team.chat}>{fullName(team)}</span
					>{i === 0 ? ', ' : i === 1 ? ' or ' : '?'}{/each}
			</p>
		</div>
		<div class="ender">
			<ModelViewer
				model="ender_chest_lid_hat"
				label="The Ender Chest Lid, the prize for the winning team"
				yaw={0.4}
				pitch={0.4}
				spin={0.6}
			/>
		</div>
	</section>

	<!-- ───────────── PRIZES ───────────── -->
	<section class="section reveal" {@attach inView()}>
		<div class="copy centered">
			<span class="step">04</span>
			<h2>Top <em>5</em> collectors win</h2>
			<p class="lead">
				On top of the team race, it's also a FFA! The top 5 players who have submitted the most items get their own overflowing Collector Chest helmet skin.
			</p>
		</div>

		<div class="first">
			<div class="rays" aria-hidden="true"></div>
			<div class="first-viewer">
				<ModelViewer model="collector_chest_1" label="The #1 Collector Chest helmet skin" />
			</div>
			<div class="rank-label" style:color={GOLD}>#1 Collector</div>
		</div>

		<div class="runners-up">
			{#each RUNNERS_UP as { rank, color } (rank)}
				<div class="runner" style:--c={color}>
					<div class="runner-viewer">
						<ModelViewer
							model="collector_chest_{rank}"
							label="The #{rank} Collector Chest helmet skin"
							phase={rank * 1.3}
						/>
					</div>
					<div class="rank-label" style:color>#{rank}</div>
				</div>
			{/each}
		</div>
		<p class="drag-hint">Drag a chest to spin it</p>
	</section>

	<!-- ───────────── PARTICIPATION ───────────── -->
	<section class="section split reverse reveal" {@attach inView()}>
		<div class="copy">
			<span class="step">05</span>
			<h2>Register <em>10 items</em>, get the Chest Lid Hat</h2>
			<p class="lead">
				Not chasing the top 5? Everyone who registers 10 items walks away with the Chest Lid Hat.
			</p>
		</div>
		<div class="hat">
			<ModelViewer model="chest_lid_hat" label="The Chest Lid Hat" yaw={0.4} pitch={0.4} spin={0.7} />
		</div>
	</section>

	<!-- ───────────── CALL TO ACTION ───────────── -->
	<section class="section cta reveal" {@attach inView()}>
		<h2 class="cta-title">Pick your side.</h2>
		<div class="cta-teams" aria-hidden="true">
			{#each TEAMS as team (team.name)}
				<span style:--c1={team.color} style:--c2={team.dark}>{fullName(team)}</span>
			{/each}
		</div>
		<button class="command" onclick={copyCommand} aria-label="Copy {COMMAND}">
			<code>{COMMAND}</code>
			<span class="copy-state">{copied ? 'Copied!' : 'Click to copy'}</span>
		</button>
		<a class="font-ten scoreboard" href="/smp/museum">SEE THE SCOREBOARD</a>
	</section>
</div>

<Footer />

<style>
	.museum {
		--ten: 'MinecraftTen', sans-serif;
		--mc: 'Mojangles', monospace;
		--ink: #0b0d1a;
		position: relative;
		isolation: isolate;
		width: 100%;
		color: #fff;
		background: var(--ink);
		overflow-x: clip;
		/* the header is transparent at the top of splash pages; tuck the hero under it */
		margin-top: -3.5rem;
	}
	h1,
	h2 {
		font-family: var(--ten);
		font-weight: normal;
		line-height: 1.1;
		margin: 0;
		text-wrap: balance;
		/* Minecraft-style hard drop shadow, plus a soft one for contrast on the block wall */
		text-shadow:
			0 0.07em 0 rgba(0, 0, 0, 0.55),
			0 0.25rem 24px rgba(0, 0, 0, 0.6);
	}
	em {
		font-style: normal;
		color: var(--gold);
	}

	/* ───── hero ───── */
	.hero {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 100svh;
		padding: 6rem 0 5rem;
		overflow: hidden;
		isolation: isolate;
	}
	.glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 50% 45%, rgba(255, 211, 77, 0.16), transparent 55%);
		z-index: -1;
	}

	.burst {
		--rx: min(47vw, 52rem);
		--ry: min(40svh, 26rem);
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.orbit {
		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		opacity: 0;
		animation: burst 0.9s cubic-bezier(0.22, 1, 0.36, 1) calc(0.2s + var(--d)) forwards;
	}
	.orbit img {
		display: block;
		width: clamp(2rem, 5vw, 4.5rem);
		image-rendering: pixelated;
		filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.5));
		animation: bob 3s ease-in-out infinite alternate;
	}
	.orbit img.block {
		width: clamp(1.8rem, 4.2vw, 4rem);
	}
	@media (max-width: 40rem) {
		/* the versus cards stack on phones; orbiting icons would sit on top of them */
		.burst {
			display: none;
		}
	}

	.hero-copy {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 1rem;
	}
	h1 {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		font-size: clamp(2.6rem, 8.5vw, 7.5rem);
		animation: punch 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.year {
		margin-top: 0.1em;
		padding-left: 0.3em;
		font-size: clamp(2rem, 5.5vw, 5rem);
		letter-spacing: 0.3em;
		color: var(--gold);
		animation: punch 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
	}

	.versus {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(0.5rem, 1.5vw, 1.25rem);
		margin-top: clamp(1.75rem, 4vw, 3rem);
	}
	.team-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: clamp(11rem, 20vw, 17rem);
		padding: 0.9rem 1.25rem 1rem;
		font-family: var(--ten);
		line-height: 1.1;
		background: linear-gradient(160deg, var(--c1), var(--c2));
		clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
		text-shadow: 0 0.08em 0 rgba(0, 0, 0, 0.35);
		animation: card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) calc(0.3s + var(--i) * 0.12s) both;
	}
	.epithet {
		font-size: clamp(0.85rem, 1.3vw, 1.1rem);
		opacity: 0.9;
	}
	.direction {
		font-size: clamp(2rem, 3.6vw, 3.25rem);
	}
	.vs {
		display: grid;
		place-items: center;
		flex: none;
		width: clamp(2.75rem, 4vw, 3.75rem);
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--ink);
		border: 3px solid #fff;
		font-family: var(--ten);
		font-size: clamp(0.95rem, 1.4vw, 1.3rem);
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
		animation: pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) calc(0.55s + var(--i) * 0.1s) both;
	}
	@media (max-width: 52rem) {
		.versus {
			flex-direction: column;
			gap: 0.4rem;
		}
		.team-card {
			width: min(80vw, 18rem);
		}
	}

	.tagline {
		margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
		animation: rise 0.5s ease-out 0.8s both;
	}
	.scoreboard {
		display: inline-block;
		padding: 0.6em 1.4em;
		font-size: clamp(1rem, 2vw, 1.35rem);
		font-weight: 700;
		color: inherit;
		text-decoration: none;
		border: 2px solid currentColor;
		border-radius: 0.5rem;
		background: rgba(0, 0, 0, 0.35);
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
		transition:
			background 0.2s,
			scale 0.2s;
	}
	.scoreboard:hover,
	.scoreboard:focus-visible {
		background: rgba(0, 0, 0, 0.6);
		scale: 1.05;
	}
	.scroll-hint {
		position: absolute;
		width: 3.5rem;
		height: 3.5rem;
		bottom: 1rem;
		left: 50%;
		translate: -50% 0;
		z-index: 2;
		padding: 0.5rem;
		color: #fff;
		background: none;
		border: 0;
		cursor: pointer;
		animation:
			rise 0.5s ease-out 1s both,
			nudge 1.6s ease-in-out 1.5s infinite;
	}

	/* ───── sections ───── */
	.section {
		width: 100%;
		max-width: 80rem;
		margin: 0 auto;
		padding: clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 3rem);
	}
	.reveal {
		opacity: 0;
		translate: 0 3rem;
		transition:
			opacity 0.7s ease-out,
			translate 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.reveal:global(.in) {
		opacity: 1;
		translate: none;
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.copy.centered {
		align-items: center;
		text-align: center;
		max-width: 52rem;
		margin: 0 auto clamp(2.5rem, 6vw, 4rem);
	}
	.step {
		font-family: var(--ten);
		font-size: 1.4rem;
		letter-spacing: 0.2em;
		color: var(--gold);
		text-shadow: 0 0.08em 0 rgba(0, 0, 0, 0.5);
	}
	h2 {
		font-size: clamp(2.1rem, 4.8vw, 4rem);
	}
	.lead {
		margin: 0;
		font-size: clamp(1.05rem, 1.8vw, 1.3rem);
		line-height: 1.55;
		color: #dfe2f3;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.6);
	}
	.lead strong {
		color: #fff;
	}
	.fine,
	.drag-hint {
		margin: 0.75rem 0 0;
		font-size: 0.85rem;
		text-align: center;
		color: #a9add0;
	}
	.split {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		align-items: center;
		gap: clamp(2rem, 5vw, 5rem);
	}
	.split.reverse {
		grid-template-columns: 1.2fr 1fr;
	}
	.split.wide-right {
		grid-template-columns: 1fr 1.5fr;
	}
	.split > * {
		/* let grid columns shrink below their content's width on small screens */
		min-width: 0;
	}
	.split.reverse .copy {
		order: 2;
	}
	@media (max-width: 52rem) {
		.split,
		.split.reverse,
		.split.wide-right {
			grid-template-columns: 1fr;
		}
		.split.reverse .copy {
			order: 0;
		}
	}

	/* team toggle */
	.team-toggle {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.team-toggle button {
		padding: 0.45rem 1.1rem 0.35rem;
		font-family: var(--ten);
		font-size: 1rem;
		color: #fff;
		background: rgba(0, 0, 0, 0.35);
		border: 2px solid var(--c);
		transform: skewX(-10deg);
		cursor: pointer;
		transition: background 0.15s;
	}
	.team-toggle button[aria-pressed='true'],
	.team-toggle button:hover {
		background: var(--c);
	}
	.stage {
		padding: clamp(1.5rem, 4vw, 3rem) clamp(0.75rem, 3vw, 2rem);
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
	}

	/* prizes */
	.first {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		isolation: isolate;
	}
	.rays {
		position: absolute;
		left: 50%;
		top: 45%;
		width: min(140vw, 70rem);
		aspect-ratio: 1;
		translate: -50% -50%;
		z-index: -1;
		background:
			radial-gradient(circle, rgba(255, 200, 40, 0.3), transparent 45%),
			repeating-conic-gradient(rgba(255, 215, 0, 0.14) 0deg 7deg, transparent 7deg 20deg);
		mask-image: radial-gradient(circle, #000 0%, transparent 60%);
		animation: rotate 40s linear infinite;
	}
	.first-viewer {
		width: min(90vw, 34rem);
		aspect-ratio: 1;
	}
	.rank-label {
		font-family: var(--ten);
		font-size: clamp(1.75rem, 4vw, 3.25rem);
		text-shadow:
			0 0.08em 0 rgba(0, 0, 0, 0.55),
			0 6px 20px rgba(0, 0, 0, 0.6);
	}
	.runners-up {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-top: clamp(2rem, 6vw, 4rem);
	}
	@media (max-width: 52rem) {
		.runners-up {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.runner {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 1rem;
		background: radial-gradient(
			circle at 50% 45%,
			color-mix(in srgb, var(--c) 18%, transparent),
			transparent 65%
		);
		border-bottom: 3px solid var(--c);
	}
	.runner-viewer {
		width: 100%;
		aspect-ratio: 1;
	}
	.runner .rank-label {
		font-size: clamp(1.5rem, 3vw, 2.5rem);
	}
	.rivals span {
		font-weight: 700;
	}
	.ender {
		aspect-ratio: 1;
		width: 100%;
		max-width: 30rem;
		justify-self: center;
		/* ender purple */
		background: radial-gradient(circle, rgba(170, 90, 255, 0.3), transparent 62%);
	}
	.hat {
		aspect-ratio: 1;
		width: 100%;
		max-width: 30rem;
		justify-self: center;
		background: radial-gradient(circle, rgba(140, 160, 255, 0.25), transparent 62%);
	}

	/* call to action */
	.cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding-bottom: clamp(6rem, 14vw, 11rem);
		text-align: center;
	}
	.cta-title {
		font-size: clamp(3rem, 9vw, 7rem);
	}
	.cta-teams {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}
	.cta-teams span {
		padding: 0.55rem 1.5rem 0.4rem;
		font-family: var(--ten);
		font-size: clamp(1.1rem, 2.4vw, 1.75rem);
		background: linear-gradient(160deg, var(--c1), var(--c2));
		transform: skewX(-10deg);
		text-shadow: 0 0.08em 0 rgba(0, 0, 0, 0.35);
	}
	.command {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 1rem 2.5rem;
		color: #fff;
		background: rgba(0, 0, 0, 0.45);
		border: 3px solid rgba(255, 255, 255, 0.35);
		border-radius: 1rem;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s,
			transform 0.15s;
	}
	.command:hover {
		background: rgba(0, 0, 0, 0.6);
		border-color: var(--gold);
		transform: translateY(-2px);
	}
	.command code {
		/* typed into the Minecraft chat, so it gets the chat font */
		font-family: var(--mc);
		font-size: clamp(1.5rem, 5vw, 2.75rem);
		text-shadow: 0.1em 0.1em 0 rgba(0, 0, 0, 0.4);
	}
	.copy-state {
		font-size: 0.85rem;
		color: #bfc3e0;
	}

	/* ───── keyframes ───── */
	@keyframes card-in {
		from {
			opacity: 0;
			translate: 0 2rem;
		}
	}
	@keyframes pop {
		from {
			scale: 0;
		}
	}
	@keyframes burst {
		from {
			opacity: 0;
			scale: 0.3;
		}
		to {
			opacity: 0.95;
			translate: calc(-50% + var(--x) * var(--rx)) calc(-50% + var(--y) * var(--ry));
		}
	}
	@keyframes bob {
		from {
			transform: rotate(calc(var(--spin) * -1)) translateY(-6px);
		}
		to {
			transform: rotate(var(--spin)) translateY(6px);
		}
	}
	@keyframes punch {
		from {
			opacity: 0;
			scale: 1.2;
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 1rem;
		}
	}
	@keyframes nudge {
		50% {
			transform: translateY(6px);
		}
	}
	@keyframes rotate {
		to {
			rotate: 360deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.title,
		.year,
		.team-card,
		.vs,
		.tagline,
		.scroll-hint,
		.orbit img,
		.rays {
			animation: none;
		}
		.orbit {
			animation: none;
			opacity: 0.95;
			translate: calc(-50% + var(--x) * var(--rx)) calc(-50% + var(--y) * var(--ry));
		}
		.reveal {
			opacity: 1;
			translate: none;
			transition: none;
		}
	}
</style>
