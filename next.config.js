import os from 'node:os';

const localIPv4 = getLocalIPv4();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Development-only, allows the dev server to accept requests from mobile devices on the same LAN.
	allowedDevOrigins: localIPv4 ? [localIPv4] : [],
	webpack: config => {
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			exclude: /node_modules/,
			use: ['raw-loader', 'glslify-loader'],
		});

		// Spark ships its WASM via `new URL('...', import.meta.url)`. Under webpack
		// (we build with `next --webpack`) that resolution breaks, so disable
		// webpack's `new URL()` parsing and let Spark resolve the asset at runtime.
		config.module.parser = {
			...config.module.parser,
			javascript: {
				...config.module.parser?.javascript,
				url: false,
			},
		};

		return config;
	},
};

/** Return first non-internal IPv4 address on this machine, or `undefined` if no LAN interface is up. */
function getLocalIPv4() {
	for (const ifaces of Object.values(os.networkInterfaces())) {
		for (const iface of ifaces ?? []) {
			if (iface.family === 'IPv4' && !iface.internal) return iface.address;
		}
	}

	return undefined;
}

export default nextConfig;
