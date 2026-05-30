import { Vector3 } from 'three';
import type { SplatMesh } from '@sparkjsdev/spark';

const SAMPLE_STRIDE = 7;
const RADIUS_PERCENTILE = 0.9;

/**
 * Scan radius and farthest distance from a sample of splat centers.
 */
export const measureScan = (mesh: SplatMesh): { radius: number; maxDistance: number } => {
	const center = new Vector3();
	let count = 0;
	mesh.forEachSplat((index, splatCenter) => {
		if (index % SAMPLE_STRIDE !== 0) return;
		center.add(splatCenter);
		count += 1;
	});
	if (count > 0) center.divideScalar(count);

	const distances: number[] = [];
	mesh.forEachSplat((index, splatCenter) => {
		if (index % SAMPLE_STRIDE !== 0) return;
		distances.push(splatCenter.distanceTo(center));
	});
	distances.sort((left, right) => left - right);
	const radius = distances.length ? distances[Math.floor((distances.length - 1) * RADIUS_PERCENTILE)] : 1;
	const maxDistance = distances.length ? distances[distances.length - 1] : radius;

	return { radius, maxDistance };
};
