import { prisma } from '../prisma';
import { unstable_cache } from 'next/cache';

async function getCommentsByArticleId(articleId: string) {
	try {
		return await prisma.comment.findMany({
			where: {
				articleId: articleId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				text: true,
				createdAt: true,
				updatedAt: true,
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des commentaires:', error);
		throw new Error('Impossible de récupérer les commentaires');
	}
}

export const getCachedCommentsByArticleId = (articleId: string) =>
	unstable_cache(async () => getCommentsByArticleId(articleId), [`comments-${articleId}`], {
		revalidate: 300,
		tags: [`comments-${articleId}`],
	});

export async function getCommentById(commentId: string) {
	try {
		return await prisma.comment.findUnique({
			where: {
				id: commentId,
			},
			select: {
				id: true,
				text: true,
				createdAt: true,
				updatedAt: true,
				userId: true,
				articleId: true,
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
			},
		});
	} catch (error) {
		console.error('Erreur lors de la récupération du commentaire:', error);
		throw new Error('Impossible de récupérer le commentaire');
	}
}
