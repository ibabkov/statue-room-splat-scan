'use client';

import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

import { BACKGROUND_COLOR, CAMERA, DPR_RANGE } from '@/constants/scene';

export type SceneCanvasProps = {
	children: ReactNode;
};

export const SceneCanvas = (props: SceneCanvasProps) => {
	const { children } = props;

	return (
		<Canvas
			flat
			gl={{ antialias: false }}
			dpr={DPR_RANGE}
			camera={CAMERA}
			style={{ position: 'absolute', inset: 0, background: BACKGROUND_COLOR }}
		>
			{children}
		</Canvas>
	);
};
