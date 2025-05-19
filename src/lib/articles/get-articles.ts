import prisma from '../../lib/prisma';

export async function getArticles() {
	return prisma.article.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});
}
