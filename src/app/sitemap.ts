import { MetadataRoute } from 'next';
import { getCachedArticles } from '@/lib/data/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.vermeil.life/';

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${baseUrl}/articles`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/mode`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/soins`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/lifestyle`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/culture`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];

	const articles = await getCachedArticles();
	const articleRoutes: MetadataRoute.Sitemap = articles.map(article => ({
		url: `${baseUrl}/article/${article.slug}`,
		lastModified: new Date(article.createdAt),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...articleRoutes];
}
