import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.pexels.com', 'images.unsplash.com'],
	},
};

export default nextConfig;
