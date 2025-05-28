import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.pexels.com', 'images.unsplash.com'],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
	},
};

export default nextConfig;
