import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';

export async function getArticles() {
	try {
		return await prisma.article.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				slug: true,
				title: true,
				excerpt: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				featured: true,
				category: true,
				createdAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles:', error);
		throw new Error('Impossible de récupérer les articles');
	}
}

export const getCachedArticles = unstable_cache(getArticles, ['articles'], {
	revalidate: 300,
	tags: ['articles'],
});

async function getUserSavedArticles(userId: string) {
	try {
		return await prisma.article.findMany({
			where: {
				favoriteByUsers: {
					some: {
						userId: userId,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				title: true,
				slug: true,
				description: true,
				excerpt: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				category: true,
				createdAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles sauvegardés:', error);
		throw new Error('Impossible de récupérer les articles sauvegardés');
	}
}

export const getCachedUserSavedArticles = unstable_cache(
	async (userId: string) => getUserSavedArticles(userId),
	['user-saved-articles'],
	{
		revalidate: 300,
		tags: ['user-saved-articles', 'articles'],
	}
);

async function getArticleBySlug(slug: string) {
	try {
		return await prisma.article.findUnique({
			where: {
				slug: slug,
			},
			select: {
				id: true,
				title: true,
				slug: true,
				description: true,
				excerpt: true,
				metaTitle: true,
				metaDescription: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				featured: true,
				category: true,
				createdAt: true,
				updatedAt: true,
				sections: true,
			},
		});
	} catch (error) {
		console.error("Erreur lors de la récupération de l'article:", error);
		throw new Error("Impossible de récupérer l'article");
	}
}

async function getArticleBySlugWithoutSections(slug: string) {
	try {
		return await prisma.article.findUnique({
			where: {
				slug: slug,
			},
			select: {
				id: true,
				title: true,
				slug: true,
				description: true,
				excerpt: true,
				metaTitle: true,
				metaDescription: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				featured: true,
				category: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	} catch (error) {
		console.error("Erreur lors de la récupération de l'article:", error);
		throw new Error("Impossible de récupérer l'article");
	}
}

async function getArticleSections(slug: string) {
	try {
		const article = await prisma.article.findUnique({
			where: {
				slug: slug,
			},
			select: {
				sections: true,
			},
		});
		return article?.sections || [];
	} catch (error) {
		console.error('Erreur lors de la récupération des sections:', error);
		throw new Error('Impossible de récupérer les sections');
	}
}

export const getCachedArticleBySlug = (slug: string) =>
	unstable_cache(async () => getArticleBySlug(slug), [`article-by-slug-${slug}`], {
		revalidate: 300,
		tags: [`article-${slug}`],
	});

export const getCachedArticleBySlugWithoutSections = (slug: string) =>
	unstable_cache(async () => getArticleBySlugWithoutSections(slug), [`article-by-slug-no-sections-${slug}`], {
		revalidate: 300,
		tags: [`article-${slug}`],
	});

export const getCachedArticleSections = (slug: string) =>
	unstable_cache(async () => getArticleSections(slug), [`article-sections-${slug}`], {
		revalidate: 300,
		tags: [`article-${slug}`],
	});

async function getArticlesByCategory(category: string) {
	try {
		return await prisma.article.findMany({
			where: {
				category: category,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				slug: true,
				title: true,
				excerpt: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				featured: true,
				category: true,
				createdAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles par catégorie:', error);
		throw new Error('Impossible de récupérer les articles de cette catégorie');
	}
}

export const getCachedArticlesByCategory = (category: string) =>
	unstable_cache(async () => getArticlesByCategory(category), [`articles-category-${category}`], {
		revalidate: 300,
		tags: [`articles-category-${category}`],
	});

async function getFeaturedArticlesExcluding(excludeId: string, limit: number = 3) {
	try {
		return await prisma.article.findMany({
			where: {
				featured: true,
				NOT: {
					id: excludeId,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: limit,
			select: {
				id: true,
				slug: true,
				title: true,
				excerpt: true,
				heroImage: true,
				heroImageAlt: true,
				readTime: true,
				category: true,
				createdAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles recommandés:', error);
		throw new Error('Impossible de récupérer les articles recommandés');
	}
}

export const getCachedFeaturedArticlesExcluding = (excludeId: string, limit: number = 3) =>
	unstable_cache(
		async () => getFeaturedArticlesExcluding(excludeId, limit),
		[`featured-articles-excluding-${excludeId}-${limit}`],
		{
			revalidate: 300,
			tags: ['articles', 'featured-articles'],
		}
	);
