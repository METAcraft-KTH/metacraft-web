<script lang="ts">
	import Main from '$lib/layout/standard/Main.svelte';
	import Title from '$lib/layout/standard/Title.svelte';
	import PageDescription from '$lib/layout/standard/PageDescription.svelte';
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

<!-- CUSTOM BG -->
<div class="-z-10 fixed bg-bookshelf bg-cover bg-center w-lvw h-lvh"></div>

<Title>{m.ovvar_shaders_title()}</Title>

<PageDescription>
	<p>{m.ovvar_shaders_why()}</p>
	<p class="mt-2 text-sm">{m.ovvar_shaders_privacy()}</p>
</PageDescription>

<Main>
	<div class="mx-auto w-full max-w-250">
		<input
			bind:this={input}
			type="file"
			accept=".zip,application/zip"
			class="hidden"
			onchange={onPick}
		/>

		{#if phase.kind === 'working'}
			<div
				class="flex flex-col justify-center items-center gap-4 bg-black/5 p-10 border-4 border-black/20 rounded-lg font-mc text-center"
				role="status"
			>
				{m.ovvar_shaders_working({ name: phase.name })}
			</div>
		{:else}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="flex flex-col justify-center items-center gap-4 p-10 border-4 rounded-lg text-center transition-colors {dragging
					? 'bg-black/5 border-black/60 border-dashed'
					: 'border-black/20'}"
				ondragover={(e) => {
					e.preventDefault();
					dragging = true;
				}}
				ondragleave={() => (dragging = false)}
				ondrop={onDrop}
			>
				<p class="font-mc">{m.ovvar_shaders_drop()}</p>
				<button
					type="button"
					class="bg-map px-6 py-3 font-mc text-black text-center transition-all hover:-translate-y-1 hover:contrast-150 notButton"
					onclick={() => input?.click()}
				>
					{m.ovvar_shaders_pick()}
				</button>
			</div>
		{/if}

		{#if several && phase.kind !== 'working'}
			<p class="mt-2 text-sm text-center">{m.ovvar_shaders_several()}</p>
		{/if}

		{#if phase.kind === 'done'}
			<div class="mt-8" role="status">
				<h2 class="font-ten text-2xl">{m.ovvar_shaders_done_title({ name: phase.outName })}</h2>
				<ol class="mt-2 ml-2 list-decimal list-inside">
					<li><LocalizedRichText msg={m.ovvar_shaders_step_1} /></li>
					<li><LocalizedRichText msg={m.ovvar_shaders_step_2} /></li>
					<li>{m.ovvar_shaders_step_3()}</li>
				</ol>
			</div>
		{:else if phase.kind === 'refused'}
			<p class="mt-4 font-mc text-red-800 text-center" role="alert">
				{refusedMessage[phase.reason]()}
			</p>
		{/if}

		{#if phase.kind === 'done' || phase.kind === 'refused'}
			<div class="flex sm:flex-row flex-col gap-4 mt-8">
				{#if phase.kind === 'done'}
					<a
						href={phase.url}
						download={phase.outName}
						class="flex-1 bg-map px-6 py-3 font-mc text-black text-center no-underline transition-all hover:-translate-y-1 hover:contrast-150"
					>
						{m.ovvar_shaders_download({ name: phase.outName })}
					</a>
				{/if}
				<button
					type="button"
					class="bg-map px-6 py-3 font-mc text-black text-center transition-all hover:-translate-y-1 hover:contrast-150 notButton"
					onclick={again}
				>
					{m.ovvar_shaders_try_again()}
				</button>
			</div>
		{/if}

		{#if (phase.kind === 'done' || phase.kind === 'refused') && phase.log.length > 0}
			<details class="mt-6">
				<summary class="cursor-pointer">{m.ovvar_shaders_details()}</summary>
				<pre
					class="bg-black mt-2 p-3 rounded overflow-x-auto font-mc text-white text-sm">{phase.log.join(
						'\n'
					)}</pre>
			</details>
		{/if}

		<p class="mt-6 text-sm">
			<a href="/ovvar/OvvarShaderPatcher.jar" download>{m.ovvar_shaders_offline()}</a>
		</p>
	</div>
</Main>
