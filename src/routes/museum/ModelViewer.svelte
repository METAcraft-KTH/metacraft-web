<script lang="ts">
	import { asset } from '$app/paths';
	import { onMount } from 'svelte';

	interface Props {
		/** Folder + file name under static/museum/models, e.g. 'collector_chest_1'. */
		model: string;
		label: string;
		/** Resting yaw in radians. The chests face the camera at π. */
		yaw?: number;
		pitch?: number;
		/**
		 * Auto-spin speed in radians per second. When 0 the model instead sways around `yaw`,
		 * so it keeps facing the viewer.
		 */
		spin?: number;
		/** How far to sway either side of `yaw`, in radians (only when `spin` is 0). */
		sway?: number;
		/** Offsets the sway so a row of models doesn't move in lockstep. */
		phase?: number;
		class?: string;
	}

	let {
		model,
		label,
		yaw = Math.PI,
		pitch = 0.3,
		spin = 0,
		sway = 0.55,
		phase = 0,
		class: className = ''
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let loaded = $state(false);
	let dragging = $state(false);

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		// three.js is only needed in the browser, so keep it out of the prerendered bundle
		Promise.all([import('three'), import('./blockbench')]).then(
			async ([THREE, { loadBlockbenchModel, disposeModel }]) => {
				if (disposed) return;
				const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
				renderer.outputColorSpace = THREE.SRGBColorSpace;
				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
				camera.position.set(0, 0.4, 2.6);
				camera.lookAt(0, 0, 0);

				const group = await loadBlockbenchModel(asset(`/museum/models/${model}`), model);
				if (disposed) {
					disposeModel(group);
					renderer.dispose();
					return;
				}
				scene.add(group);
				loaded = true;

				let ry = yaw;
				let rx = pitch;
				let velocity = spin;
				let pointer: { id: number; x: number; y: number } | null = null;
				const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

				const resize = () => {
					const { clientWidth: w, clientHeight: h } = canvas;
					renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
					renderer.setSize(w, h, false);
					camera.aspect = w / h;
					camera.updateProjectionMatrix();
				};
				const ro = new ResizeObserver(resize);
				ro.observe(canvas);
				resize();

				let visible = false;
				let frame = 0;
				let last = performance.now();
				const tick = (now: number) => {
					const dt = Math.min((now - last) / 1000, 0.1);
					last = now;
					if (!pointer) {
						if (spin) {
							// ease back to the idle spin after a flick
							const idle = reduceMotion ? 0 : spin;
							velocity += (idle - velocity) * Math.min(1, dt * 2);
							ry += velocity * dt;
						} else {
							// let a flick coast, then drift back to the nearest front-facing turn
							velocity *= Math.exp(-dt * 2.5);
							ry += velocity * dt;
							let target = yaw + (reduceMotion ? 0 : sway * Math.sin(now / 1100 + phase));
							target += Math.PI * 2 * Math.round((ry - target) / (Math.PI * 2));
							ry += (target - ry) * Math.min(1, dt * 1.5);
						}
						rx += (pitch - rx) * Math.min(1, dt * 3);
					}
					group.rotation.set(rx, ry, 0);
					group.position.y = reduceMotion ? 0 : Math.sin(now / 700) * 0.025;
					renderer.render(scene, camera);
					if (visible) frame = requestAnimationFrame(tick);
				};
				const io = new IntersectionObserver(([entry]) => {
					visible = entry.isIntersecting;
					cancelAnimationFrame(frame);
					if (visible) {
						last = performance.now();
						frame = requestAnimationFrame(tick);
					}
				});
				io.observe(canvas);

				const down = (e: PointerEvent) => {
					pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
					canvas.setPointerCapture(e.pointerId);
					dragging = true;
					velocity = 0;
				};
				const move = (e: PointerEvent) => {
					if (pointer?.id !== e.pointerId) return;
					const dx = e.clientX - pointer.x;
					const dy = e.clientY - pointer.y;
					pointer.x = e.clientX;
					pointer.y = e.clientY;
					ry += dx * 0.012;
					rx = Math.max(-0.6, Math.min(1.1, rx + dy * 0.008));
					velocity = (dx * 0.012) / 0.016; // keep the flick going after release
				};
				const up = (e: PointerEvent) => {
					if (pointer?.id !== e.pointerId) return;
					pointer = null;
					dragging = false;
					velocity = Math.max(-12, Math.min(12, velocity));
				};
				canvas.addEventListener('pointerdown', down);
				canvas.addEventListener('pointermove', move);
				canvas.addEventListener('pointerup', up);
				canvas.addEventListener('pointercancel', up);

				cleanup = () => {
					cancelAnimationFrame(frame);
					io.disconnect();
					ro.disconnect();
					canvas.removeEventListener('pointerdown', down);
					canvas.removeEventListener('pointermove', move);
					canvas.removeEventListener('pointerup', up);
					canvas.removeEventListener('pointercancel', up);
					disposeModel(group);
					renderer.dispose();
				};
			}
		);

		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="viewer {className}"
	class:loaded
	class:dragging
	title={label}>{label}</canvas
>

<style>
	.viewer {
		display: block;
		width: 100%;
		height: 100%;
		cursor: grab;
		/* vertical swipes still scroll the page on touch screens */
		touch-action: pan-y;
		opacity: 0;
		transform: scale(0.6);
		transition:
			opacity 0.4s ease-out,
			transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.viewer.loaded {
		opacity: 1;
		transform: none;
	}
	.viewer.dragging {
		cursor: grabbing;
	}
</style>
