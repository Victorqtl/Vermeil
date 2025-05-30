import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.pexels.com', 'images.unsplash.com', 'media.istockphoto.com'],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '2mb',
		},
		authInterrupts: true,
	},
};

export default nextConfig;
