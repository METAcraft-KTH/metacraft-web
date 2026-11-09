/// <reference lib="webworker" />
import { processPack } from './process.ts';

export interface WorkerRequest {
	name: string;
	bytes: ArrayBuffer;
}

export interface WorkerResponse {
	status: 'PATCHED' | 'PATCHED_COPY' | 'NOT_A_SHADERPACK' | 'NOTHING_PATCHED';
	log: string[];
	outName?: string;
	bytes?: ArrayBuffer;
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
	const { name, bytes } = event.data;
	const result = processPack(name, new Uint8Array(bytes));
	// A copy of the view's own range, so the transferred buffer is exactly the zip.
	const out = result.bytes ? result.bytes.slice().buffer : undefined;
	const response: WorkerResponse = {
		status: result.status,
		log: result.log,
		outName: result.outName,
		bytes: out
	};
	(self as unknown as DedicatedWorkerGlobalScope).postMessage(response, out ? [out] : []);
};
