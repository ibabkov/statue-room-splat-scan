'use client';

import { useRef } from 'react';

import { clamp01 } from '@/helpers';

export type Timeline = {
	/** Advance by `delta` seconds. Returns `progress` in [0, 1] while running. */
	advance: (delta: number) => number | null;
	reset: () => void;
};

/**
 * Creates a per-instance one-shot timeline that stays stable across renders.
 */
export const useTimeline = (duration: number): Timeline => {
	const ref = useRef<Timeline | null>(null);

	if (ref.current === null) {
		let elapsed = 0;
		let done = false;

		ref.current = {
			advance: delta => {
				if (done) return null;
				elapsed += delta;
				const progress = clamp01(elapsed / duration);
				if (progress >= 1) done = true;

				return progress;
			},
			reset: () => {
				elapsed = 0;
				done = false;
			},
		};
	}

	return ref.current;
};
