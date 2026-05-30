'use client';

import { useCallback, useState } from 'react';

import type { ScenePhase } from '@/types';

type ApplicationPhaseController = {
	phase: ScenePhase;
	/** Download progress, 0..1. */
	progress: number;
	error: Error | null;
	onProgress: (fraction: number) => void;
	onLoaded: () => void;
	onIntroComplete: () => void;
	onError: (error: Error) => void;
};

export const useApplicationPhase = (): ApplicationPhaseController => {
	const [phase, setPhase] = useState<ScenePhase>('LOADING');
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState<Error | null>(null);

	const onProgress = useCallback((fraction: number) => setProgress(fraction), []);
	const onLoaded = useCallback(() => setPhase(prev => (prev === 'LOADING' ? 'INTRO' : prev)), []);
	const onIntroComplete = useCallback(() => setPhase(prev => (prev === 'INTRO' ? 'INTERACTIVE' : prev)), []);
	const onError = useCallback((err: Error) => setError(err), []);

	return { phase, progress, error, onProgress, onLoaded, onIntroComplete, onError };
};
