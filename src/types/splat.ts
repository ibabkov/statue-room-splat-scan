import type { Vector3 } from 'three';
import type { SplatMesh } from '@sparkjsdev/spark';

/** A loaded Gaussian splat scan data. */
export type SplatScan = {
	mesh: SplatMesh;
	/** Bounding-sphere radius. */
	radius: number;
	/** Distance to the farthest sampled splat. */
	maxDistance: number;
};

/** Gaussian splat orbit pivot and radius. */
export type SplatBounds = {
	/** Orbit pivot in world space (post Y-flip). */
	target: Vector3;
	/** Bounding-sphere radius. */
	radius: number;
};
