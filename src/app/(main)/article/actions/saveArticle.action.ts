'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const saveArticleSchema = z.object({
	articleId: z.string(),
});

export const saveArticle = authActionClient.schema(saveArticleSchema).action(async ({ parsedInput: input, ctx }) => {
	const user = ctx.user;

	try {
		const existingFavorite = await prisma.userFavorite.findFirst({
			where: {
				userId: user.id,
				articleId: input.articleId,
			},
		});

		if (existingFavorite) {
			await prisma.userFavorite.delete({
				where: { id: existingFavorite.id },
			});
		} else {
			await prisma.userFavorite.create({
				data: {
					userId: user.id,
					articleId: input.articleId,
				},
			});
		}

		revalidateTag('user-saved-articles');

		return { success: true };
	} catch (error) {
		console.error('Erreur lors de la mise à jour des favoris:', error);
		throw new SafeError('Erreur lors de la mise à jour des favoris');
	}
});
