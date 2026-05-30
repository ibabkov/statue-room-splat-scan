/** Spherical camera pose in radians. */
export type IntroPose = {
	azimuth: number;
	polar: number;
	radius: number;
};

export type IntroPoseConfig = {
	azimuth: number;
	polar: number;
	radiusScale: number;
};
