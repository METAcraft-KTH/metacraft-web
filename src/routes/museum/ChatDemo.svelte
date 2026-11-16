<script lang="ts">
	import { inView } from './inView';
	import { ITEMS, TEAMS, itemIcon, itemName, isBlock } from './museum';

	interface Props {
		team: (typeof TEAMS)[number];
	}

	let { team }: Props = $props();

	const SHOWN = 4;
	const LOOP = 6;

	interface Line {
		key: number;
		item: number;
		count: number;
	}

	let lines: Line[] = $state([]);
	let current = $state(0);
	let pulse = $state(0);

	let running = false;
	function start() {
		if (running) return;
		running = true;
		let n = 0;
		const step = () => {
			const count = (n % LOOP) + 1;
			if (count === 1) lines = [];
			current = (n * 3) % ITEMS.length;
			lines = [...lines, { key: n, item: current, count }].slice(-SHOWN);
			pulse = n;
			n++;
		};
		step();
		const id = setInterval(step, 1600);
		return () => clearInterval(id);
	}

	let stop: (() => void) | undefined;
	$effect(() => () => stop?.());
</script>

<div class="demo" {@attach inView(() => (stop = start()))}>
	{#key pulse}
		<img
			class="item"
			class:block={isBlock(current)}
			src={itemIcon(current)}
			alt={itemName(current)}
		/>
	{/key}
	<div class="chat font-mc" aria-live="polite">
		{#each lines as line (line.key)}
			<!-- Svelte trims whitespace at the edges of elements, so spaces between spans are explicit;
			     non-breaking ones keep team names and counts together when a line wraps -->
			<p class="line">
				<span class="g">Registered</span>{' '}<span class="w">{itemName(line.item)}</span><span
					class="g">, new for</span
				>{' '}<span style:color={team.chat}>{'The ' + team.name}</span><span class="g">!</span>{' '}<span
					class="gr">| {'You: ' + line.count} |</span
				>{' '}<span style:color={team.chat}>{'The ' + team.name}</span><span class="gr">: {line.count}</span>
			</p>
		{/each}
	</div>
</div>

<style>
	.demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
	}
	.item {
		width: 7rem;
		height: 7rem;
		image-rendering: pixelated;
		filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.6));
		animation: pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.item.block {
		transform: rotate(45deg) scale(0.8);
		animation-name: pop-block;
	}
	.chat {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 2px;
		width: 100%;
		max-width: 46rem;
		/* fixed height so the page doesn't jump as lines come and go; older lines scroll off the top */
		height: 10em;
		mask-image: linear-gradient(transparent, #000 2.5em);
		font-size: clamp(0.75rem, 2.1vw, 0.95rem);
		overflow: hidden;
	}
	.line {
		margin: 0;
		padding: 0.3em 0.6em;
		background: rgba(0, 0, 0, 0.55);
		word-spacing: 0.15em;
		text-shadow: 0.12em 0.12em 0 rgba(0, 0, 0, 0.35);
		animation: slide 0.25s ease-out;
	}
	.g {
		color: #55ff55;
	}
	.w {
		color: #fff;
	}
	.gr {
		color: #aaa;
	}
	@keyframes slide {
		from {
			opacity: 0;
			transform: translateX(-2rem);
		}
	}
	@keyframes pop {
		from {
			transform: scale(0.4) rotate(-12deg);
		}
	}
	@keyframes pop-block {
		from {
			transform: rotate(30deg) scale(0.3);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.item,
		.line {
			animation: none;
		}
	}
</style>
