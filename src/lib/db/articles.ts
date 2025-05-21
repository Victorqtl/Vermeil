import { prisma } from '../prisma';

export async function getArticles() {
	return prisma.article.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
}
