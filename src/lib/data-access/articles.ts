import { prisma } from '../prisma';

export async function getArticles() {
	try {
		return await prisma.article.findMany({
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
				readTime: true,
				category: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles:', error);
		throw new Error('Impossible de récupérer les articles');
	}
}

export async function getUserSavedArticles(userId: string) {
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
				readTime: true,
				category: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles sauvegardés:', error);
		throw new Error('Impossible de récupérer les articles sauvegardés');
	}
}
