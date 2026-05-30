'use client';

import { useEffect } from 'react';

import { createFocusModifier } from '@/shaders/focusModifier';
import { toSplatObjectSpace, easeOut } from '@/helpers';
import { useTimeline } from '@/hooks/useTimeline';
import type { SplatScan } from '@/types';
import { SCENE_CENTER } from '@/constants/scene';
import { REVEAL_DURATION, REVEAL_EDGE_SCALE } from '@/constants/intro';

/**
 * Animates the focus-reveal front outward so the scene reveals from the statue.
 */
export const useFocusIntro = (scan: SplatScan | null) => {
	const timeline = useTimeline(REVEAL_DURATION);

	useEffect(() => {
		if (!scan) return;

		const { mesh, radius, maxDistance } = scan;
		const focusCenter = toSplatObjectSpace(SCENE_CENTER);
		const revealSoftness = REVEAL_EDGE_SCALE * radius;
		const revealTarget = maxDistance + revealSoftness;
		const { modifier, revealRadius } = createFocusModifier({ center: focusCenter, revealSoftness });

		mesh.objectModifier = modifier;
		mesh.updateGenerator();
		mesh.needsUpdate = true;
		timeline.reset();

		mesh.onFrame = ({ deltaTime }) => {
			const progress = timeline.advance(deltaTime);

			if (progress === null) return;

			revealRadius.value = easeOut(progress) * revealTarget;

			mesh.updateVersion();
		};
	}, [scan, timeline]);
};
