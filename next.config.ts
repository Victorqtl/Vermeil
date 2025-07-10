import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
		authInterrupts: true,
	},
};

export default nextConfig;
