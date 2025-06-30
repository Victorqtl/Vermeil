import { prisma } from '../prisma';

export async function getSavedArticlesById(userId: string, articleId: string) {
	try {
		return await prisma.userFavorite.findFirst({
			where: {
				userId,
				articleId,
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des articles sauvegardés:', error);
		throw new Error('Impossible de récupérer les articles sauvegardés');
	}
}
