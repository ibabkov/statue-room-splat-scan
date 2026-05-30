import type { Vector3 } from 'three';
import { dyno } from '@sparkjsdev/spark';
import type { GsplatModifier } from '@sparkjsdev/spark';

export type FocusModifierParams = {
	center: Vector3;
	/** Width of the soft edge the reveal front fades across. */
	revealSoftness: number;
};

type FocusModifier = {
	modifier: GsplatModifier;
	revealRadius: dyno.DynoFloat<string>;
};

/**
 * Hides a splat behind the expanding reveal front, vanishing across an edge.
 */
const applyReveal = (
	scales: dyno.DynoVal<'vec3'>,
	opacity: dyno.DynoVal<'float'>,
	dist: dyno.DynoVal<'float'>,
	revealRadius: dyno.DynoVal<'float'>,
	revealSoftness: number,
): { scales: dyno.DynoVal<'vec3'>; opacity: dyno.DynoVal<'float'> } => {
	const revealEdge = dyno.dynoConst('float', revealSoftness);
	const one = dyno.dynoConst('float', 1);

	const revealInner = dyno.sub(revealRadius, revealEdge);
	const hidden = dyno.smoothstep(revealInner, revealRadius, dist);
	const visibility = dyno.sub(one, hidden);

	return {
		scales: dyno.mul(scales, visibility),
		opacity: dyno.mul(opacity, visibility),
	};
};

/**
 * Builds the spark splat reveal modifier and exposes its live `revealRadius` uniform.
 */
export function createFocusModifier({ center, revealSoftness }: FocusModifierParams): FocusModifier {
	const subjectCenter = dyno.dynoConst('vec3', center.clone());
	const revealRadius = dyno.dynoFloat(0);

	const modifier = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
		const splat = dyno.splitGsplat(gsplat!).outputs;
		const dist = dyno.distance(splat.center, subjectCenter);

		const { scales, opacity } = applyReveal(splat.scales, splat.opacity, dist, revealRadius, revealSoftness);

		return { gsplat: dyno.combineGsplat({ gsplat, scales, opacity }) };
	});

	return { modifier, revealRadius };
}
