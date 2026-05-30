import { type Camera, MathUtils, Spherical, Vector3 } from 'three';

import type { IntroPose, IntroPoseConfig } from '@/types';

const { degToRad, lerp } = MathUtils;
const scratchSpherical = new Spherical();
const scratchPosition = new Vector3();

export const poseFromConfig = (config: IntroPoseConfig, sceneRadius: number): IntroPose => ({
	azimuth: degToRad(config.azimuth),
	polar: degToRad(config.polar),
	radius: config.radiusScale * sceneRadius,
});

export const lerpPose = (start: IntroPose, end: IntroPose, progress: number): IntroPose => ({
	azimuth: lerp(start.azimuth, end.azimuth, progress),
	polar: lerp(start.polar, end.polar, progress),
	radius: lerp(start.radius, end.radius, progress),
});

export const applyPose = (camera: Camera, pose: IntroPose, target: Vector3) => {
	scratchSpherical.set(pose.radius, pose.polar, pose.azimuth);
	scratchPosition.setFromSpherical(scratchSpherical).add(target);
	camera.position.copy(scratchPosition);
	camera.lookAt(target);
};
