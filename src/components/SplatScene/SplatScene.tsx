'use client';

import { useMemo, useState } from 'react';
import { MathUtils } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import { SparkRenderer } from '@/lib/spark';
import { FocusedSplat } from '@/components/FocusedSplat';
import { useCinematicIntro } from '@/hooks';
import { INTRO_END, INTRO_START } from '@/constants/intro';
import type { ScenePhase, SplatBounds } from '@/types';

const { degToRad } = MathUtils;
const ORBIT_RADIUS_SCALE_MIN = Math.min(INTRO_START.radiusScale, INTRO_END.radiusScale);
const ORBIT_RADIUS_SCALE_MAX = Math.max(INTRO_START.radiusScale, INTRO_END.radiusScale);
const ORBIT_POLAR_MIN = degToRad(Math.min(INTRO_START.polar, INTRO_END.polar));
const ORBIT_POLAR_MAX = degToRad(Math.max(INTRO_START.polar, INTRO_END.polar));

export type SplatSceneProps = {
	phase: ScenePhase;
	onProgress?: (fraction: number) => void;
	onLoaded?: () => void;
	onIntroComplete?: () => void;
	onError?: (error: Error) => void;
};

export const SplatScene = (props: SplatSceneProps) => {
	const { phase, onProgress, onLoaded, onIntroComplete, onError } = props;
	const renderer = useThree(state => state.gl);
	const [bounds, setBounds] = useState<SplatBounds | null>(null);
	const sceneRadius = bounds?.radius ?? 1;
	const sparkArgs = useMemo(() => ({ renderer }), [renderer]);
	const controlsRef = useCinematicIntro({ phase, bounds, onComplete: onIntroComplete });
	const handleReady = (nextBounds: SplatBounds) => {
		setBounds(nextBounds);
		onLoaded?.();
	};

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				makeDefault
				enabled={phase === 'INTERACTIVE'}
				enableDamping
				enablePan={false}
				minDistance={sceneRadius * ORBIT_RADIUS_SCALE_MIN}
				maxDistance={sceneRadius * ORBIT_RADIUS_SCALE_MAX}
				minPolarAngle={ORBIT_POLAR_MIN}
				maxPolarAngle={ORBIT_POLAR_MAX}
			/>
			<SparkRenderer args={[sparkArgs]}>
				<FocusedSplat onProgress={onProgress} onReady={handleReady} onError={onError} />
			</SparkRenderer>
		</>
	);
};
