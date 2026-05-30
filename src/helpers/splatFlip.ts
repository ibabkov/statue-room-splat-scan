// Polycam exports Y-down, three.js is Y-up. Flip 180 deg about X on the mesh.
import { Euler, Vector3 } from 'three';

const SPLAT_FLIP_ROTATION: [number, number, number] = [Math.PI, 0, 0];
const FLIP_EULER = new Euler(...SPLAT_FLIP_ROTATION);

export const getSplatFlipRotation = (): [number, number, number] => SPLAT_FLIP_ROTATION;

export const toSplatObjectSpace = (worldPoint: readonly [number, number, number]): Vector3 =>
	new Vector3(...worldPoint).applyEuler(FLIP_EULER);
