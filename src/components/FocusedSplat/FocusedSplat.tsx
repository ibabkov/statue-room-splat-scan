'use client';

import { Vector3 } from 'three';
import { useEffect } from 'react';

import { useFocusIntro, useSplatScan } from '@/hooks';
import { SCENE_CENTER } from '@/constants/scene';
import { getSplatFlipRotation } from '@/helpers';
import type { SplatBounds } from '@/types';
import { SplatFileType } from '@sparkjsdev/spark';

export type FocusedSplatProps = {
	onProgress?: (fraction: number) => void;
	onReady?: (bounds: SplatBounds) => void;
	onError?: (error: Error) => void;
};

export const FocusedSplat = (props: FocusedSplatProps) => {
	const { onProgress, onReady, onError } = props;
	const { scan, error } = useSplatScan({ url: '/philip-v-statue.ksplat', fileType: SplatFileType.KSPLAT, onProgress });
	useFocusIntro(scan);

	useEffect(() => {
		if (!scan) return;

		const target = new Vector3(...SCENE_CENTER);

		onReady?.({ target, radius: scan.radius });
	}, [scan]);

	useEffect(() => {
		if (error) onError?.(error);
	}, [error]);

	if (!scan) return null;

	return <primitive object={scan.mesh} rotation={getSplatFlipRotation()} />;
};
