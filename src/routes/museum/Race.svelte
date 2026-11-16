<script lang="ts">
	import { inView } from './inView';
	import { TEAMS, itemIcon, isBlock } from './museum';

	const STEPS = 12;
	const HEIGHT = 9;

	/** Icons stacked per team. Illustrative only: no real scores. */
	let stacks: number[][] = $state(TEAMS.map(() => []));

	function start() {
		let step = 0;
		let seed = 0;
		const id = setInterval(() => {
			if (step === STEPS + 6) {
				// short pause at the top, then race again
				stacks = TEAMS.map(() => []);
				step = 0;
				seed++;
				return;
			}
			if (step < STEPS) {
				stacks = stacks.map((s, team) => {
					// each team registers something new on roughly 2 of 3 steps, so the lead changes hands
					const scores = (step * 7 + team * 5 + seed * 3) % 3 !== 0;
					return scores && s.length < HEIGHT ? [...s, team * 7 + step * 3 + seed] : s;
				});
			}
			step++;
		}, 320);
		return () => clearInterval(id);
	}

	let stop: (() => void) | undefined;
	$effect(() => () => stop?.());
</script>

<div class="race" {@attach inView(() => (stop = start()))}>
	{#each TEAMS as team, i (team.name)}
		<div class="col">
			<div class="stack">
				{#each stacks[i] as item (item)}
					<img src={itemIcon(item)} alt="" class:block={isBlock(item)} />
				{/each}
			</div>
			<div class="bar" style:background={team.color}></div>
			<div class="label" style:color={team.color}>
				<span class="epithet">The {team.epithet}</span>
				<span>{team.name}</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.race {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(0.5rem, 4vw, 4rem);
		width: 100%;
		max-width: 52rem;
		margin: 0 auto;
	}
	.col {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.stack {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		gap: 0.25rem;
		height: calc(9 * (clamp(1.75rem, 6vw, 3rem) + 0.25rem));
	}
	.stack img {
		width: clamp(1.75rem, 6vw, 3rem);
		height: clamp(1.75rem, 6vw, 3rem);
		image-rendering: pixelated;
		filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
		animation: drop 0.25s ease-out;
	}
	.stack img.block {
		transform: scale(0.85);
	}
	.bar {
		width: 100%;
		height: 0.5rem;
		margin-top: 0.75rem;
		border-radius: 999px;
	}
	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 0.75rem;
		font-family: var(--ten);
		font-size: clamp(1.25rem, 4.5vw, 2.5rem);
		line-height: 1.1;
		text-align: center;
		text-shadow: 0 0.08em 0 rgba(0, 0, 0, 0.5);
	}
	.epithet {
		font-size: clamp(0.65rem, 2vw, 1.1rem);
		opacity: 0.9;
	}
	@keyframes drop {
		from {
			opacity: 0;
			translate: 0 -3rem;
			scale: 1.4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.stack img {
			animation: none;
		}
	}
</style>
