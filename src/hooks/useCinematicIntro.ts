'use client';

import type { Vector3 } from 'three';
import { type ComponentRef, type RefObject, useEffect, useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import { applyPose, lerpPose, poseFromConfig, easeInOut } from '@/helpers';
import { INTRO_DURATION, INTRO_END, INTRO_START } from '@/constants/intro';
import { useTimeline } from '@/hooks/useTimeline';
import type { ScenePhase, SplatBounds } from '@/types';

export type UseCinematicIntroParams = {
	phase: ScenePhase;
	bounds: SplatBounds | null;
	onComplete?: () => void;
};

/**
 * Animates the camera while phase is INTRO, then hands off to orbit controls.
 */
export const useCinematicIntro = (params: UseCinematicIntroParams): RefObject<ComponentRef<typeof OrbitControls> | null> => {
	const { phase, bounds, onComplete } = params;
	const camera = useThree(state => state.camera);
	const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
	const timeline = useTimeline(INTRO_DURATION);
	const poses = useMemo(() => {
		if (!bounds) return null;

		return {
			start: poseFromConfig(INTRO_START, bounds.radius),
			end: poseFromConfig(INTRO_END, bounds.radius),
		};
	}, [bounds]);

	useEffect(() => {
		if (!bounds || !poses) return;

		applyPose(camera, poses.start, bounds.target);
		syncControls(controlsRef.current, bounds.target);
	}, [bounds, poses, camera]);

	useFrame((_, delta) => {
		if (phase !== 'INTRO' || !bounds || !poses) return;

		const progress = timeline.advance(delta);

		if (progress === null) return;

		applyPose(camera, lerpPose(poses.start, poses.end, easeInOut(progress)), bounds.target);

		if (progress >= 1) {
			syncControls(controlsRef.current, bounds.target);
			onComplete?.();
		}
	});

	return controlsRef;
};

function syncControls(controls: ComponentRef<typeof OrbitControls> | null, target: Vector3) {
	if (!controls) return;

	controls.target.copy(target);
	controls.update();
}
