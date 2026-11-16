import type { Attachment } from 'svelte/attachments';

/**
 * Calls `onEnter` once, the first time the element scrolls into view, and adds the
 * `in` class to it so CSS can animate it. Use as `{@attach inView()}`.
 */
export function inView(onEnter?: () => void, threshold = 0.25): Attachment<HTMLElement> {
	return (node) => {
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				node.classList.add('in');
				onEnter?.();
				io.disconnect();
			},
			{ threshold }
		);
		io.observe(node);
		return () => io.disconnect();
	};
}
