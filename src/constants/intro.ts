import { IntroPoseConfig } from '@/types';

/** Spherical camera pose the cinematic glide starts from. */
export const INTRO_START: IntroPoseConfig = { azimuth: -55, polar: 40, radiusScale: 0.35 };
/** Spherical camera pose the cinematic glide ends at. */
export const INTRO_END: IntroPoseConfig = { azimuth: 80, polar: 100, radiusScale: 0.2 };
/** Seconds the camera takes to glide from INTRO_START to INTRO_END. */
export const INTRO_DURATION = 4;

/** Seconds for the focus-reveal front to clear the whole scene. */
export const REVEAL_DURATION = INTRO_DURATION * 2;
/** Soft-edge width of the focus-reveal front. */
export const REVEAL_EDGE_SCALE = 2;
