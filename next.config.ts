import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	trailingSlash: false,
	output: 'standalone',
	// experimental: {
	//     nodeMiddleware: true,
	// },
};

export default nextConfig;
