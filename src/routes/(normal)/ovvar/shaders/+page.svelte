<script lang="ts">
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import Seo from '$lib/Seo.svelte';
	import LocalizedRichText from '$lib/textstyles/LocalizedRichText.svelte';
	import { onDestroy } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import type { WorkerRequest, WorkerResponse } from '$lib/ovvar-patcher/worker.ts';

	type Reason =
		'PATCHED_COPY' | 'NOT_A_SHADERPACK' | 'NOTHING_PATCHED' | 'UNREADABLE' | 'ERROR' | 'FOLDER';
	type State =
		| { kind: 'idle' }
		| { kind: 'working'; name: string }
		| { kind: 'done'; name: string; outName: string; url: string; log: string[] }
		| { kind: 'refused'; reason: Reason; log: string[] };

	let phase = $state<State>({ kind: 'idle' });
	let dragging = $state(false);
	let several = $state(false);
	let input: HTMLInputElement | undefined = $state();
	let current: Worker | undefined;

	/** Frees what the previous run holds: its worker and its download URL. */
	function reset() {
		current?.terminate();
		current = undefined;
		if (phase.kind === 'done') URL.revokeObjectURL(phase.url);
	}

	onDestroy(reset);

	function again() {
		reset();
		several = false;
		phase = { kind: 'idle' };
	}

	function fail(reason: Reason = 'ERROR') {
		reset();
		phase = { kind: 'refused', reason, log: [] };
	}

	function run(file: File) {
		reset();
		phase = { kind: 'working', name: file.name };
		let worker: Worker;
		try {
			worker = new Worker(new URL('$lib/ovvar-patcher/worker.ts', import.meta.url), {
				type: 'module'
			});
		} catch {
			fail();
			return;
		}
		current = worker;
		const gone = () => worker !== current;
		worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
			if (gone()) return;
			const { status, log, outName, bytes } = event.data;
			if (status === 'PATCHED' && bytes && outName) {
				reset();
				let url: string;
				try {
					url = URL.createObjectURL(new Blob([bytes], { type: 'application/zip' }));
				} catch {
					fail();
					return;
				}
				phase = { kind: 'done', name: file.name, outName, url, log };
				try {
					// May be blocked without user activation (Safari); the link below is the fallback.
					const a = document.createElement('a');
					a.href = url;
					a.download = outName;
					document.body.appendChild(a);
					a.click();
					a.remove();
				} catch {
					// the visible link still works
				}
			} else {
				reset();
				phase = { kind: 'refused', reason: status === 'PATCHED' ? 'ERROR' : status, log };
			}
		};
		worker.onerror = () => {
			if (!gone()) fail();
		};
		worker.onmessageerror = () => {
			if (!gone()) fail();
		};
		file.arrayBuffer().then(
			(bytes) => {
				if (gone()) return;
				try {
					const request: WorkerRequest = { name: file.name, bytes };
					worker.postMessage(request, [bytes]);
				} catch {
					fail();
				}
			},
			() => {
				if (!gone()) fail();
			}
		);
	}

	function accept(files: FileList | null | undefined, items?: DataTransferItemList) {
		const file = files?.[0];
		if (!file) return;
		several = files.length > 1;
		// Dropped folders are only recognisable through the entry API.
		const entry = items?.[0]?.webkitGetAsEntry?.();
		if (entry?.isDirectory) {
			reset();
			phase = { kind: 'refused', reason: 'FOLDER', log: [] };
			return;
		}
		if (!file.name.toLowerCase().endsWith('.zip')) {
			reset();
			phase = { kind: 'refused', reason: 'NOT_A_SHADERPACK', log: [] };
			return;
		}
		run(file);
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		dragging = false;
		accept(event.dataTransfer?.files, event.dataTransfer?.items);
	}

	function onPick(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		accept(target.files);
		target.value = '';
	}

	const refusedMessage = {
		PATCHED_COPY: () => m.ovvar_shaders_patched_copy(),
		NOT_A_SHADERPACK: () => m.ovvar_shaders_not_a_pack(),
		NOTHING_PATCHED: () => m.ovvar_shaders_nothing(),
		UNREADABLE: () => m.ovvar_shaders_unreadable(),
		ERROR: () => m.ovvar_shaders_error(),
		FOLDER: () => m.ovvar_shaders_folder()
	};
</script>

<svelte:window
	ondragover={(e) => e.preventDefault()}
	ondrop={(e) => {
		// Drops outside the zone (or while working) must not make the browser open the file.
		e.preventDefault();
		dragging = false;
	}}
/>

<Seo title={m.ovvar_shaders_seo()} />

<div class="-z-10 fixed bg-bookshelf bg-cover bg-center w-lvw h-lvh"></div>

<Title>{m.ovvar_shaders_title()}</Title>

<Main>
	<p class="mb-2">{m.ovvar_shaders_why()}</p>
	<p class="mb-6 text-base opacity-75">{m.ovvar_shaders_privacy()}</p>

	{#if phase.kind === 'working'}
		<div class="flex flex-col items-center gap-4 p-10" role="status">
			<div
				class="border-4 border-black/20 border-t-black rounded-full w-12 h-12 animate-spin"
			></div>
			<p>{m.ovvar_shaders_working({ name: phase.name })}</p>
		</div>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex flex-col items-center gap-2 p-10 border-4 border-dashed rounded-lg text-center transition-colors {dragging
				? 'border-black bg-black/10'
				: 'border-black/40'}"
			ondragover={(e) => {
				e.preventDefault();
				dragging = true;
			}}
			ondragleave={() => (dragging = false)}
			ondrop={onDrop}
		>
			<p class="font-bold">{m.ovvar_shaders_drop()}</p>
			<button type="button" class="underline cursor-pointer" onclick={() => input?.click()}>
				{m.ovvar_shaders_pick()}
			</button>
			<input
				bind:this={input}
				type="file"
				accept=".zip,application/zip"
				class="hidden"
				onchange={onPick}
			/>
		</div>
	{/if}

	{#if several && phase.kind !== 'working'}
		<p class="mt-4 text-base">{m.ovvar_shaders_several()}</p>
	{/if}

	{#if phase.kind === 'done'}
		<div class="mt-6" role="status">
			<h2 class="mb-2 font-ten text-2xl">{m.ovvar_shaders_done_title({ name: phase.outName })}</h2>
			<p class="mb-3">
				<a class="font-bold underline" href={phase.url} download={phase.outName}>
					{m.ovvar_shaders_download({ name: phase.outName })}
				</a>
			</p>
			<ol class="pl-6 list-decimal">
				<li><LocalizedRichText msg={m.ovvar_shaders_step_1} /></li>
				<li><LocalizedRichText msg={m.ovvar_shaders_step_2} /></li>
				<li>{m.ovvar_shaders_step_3()}</li>
			</ol>
		</div>
	{:else if phase.kind === 'refused'}
		<p class="mt-6 font-bold" role="alert">{refusedMessage[phase.reason]()}</p>
	{/if}

	{#if (phase.kind === 'done' || phase.kind === 'refused') && phase.log.length > 0}
		<details class="mt-4">
			<summary class="cursor-pointer">{m.ovvar_shaders_details()}</summary>
			<pre class="mt-2 p-3 overflow-x-auto text-sm bg-black/10 rounded">{phase.log.join('\n')}</pre>
		</details>
	{/if}

	{#if phase.kind === 'done' || phase.kind === 'refused'}
		<button type="button" class="mt-6 underline cursor-pointer" onclick={again}>
			{m.ovvar_shaders_try_again()}
		</button>
	{/if}

	<p class="mt-10 text-base">
		<a href="/ovvar/OvvarShaderPatcher.jar" download>{m.ovvar_shaders_offline()}</a>
	</p>
</Main>
