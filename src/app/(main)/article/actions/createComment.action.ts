'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createCommentSchema = z.object({
	articleId: z.string(),
	text: z
		.string()
		.min(1, 'Le commentaire ne peut pas être vide')
		.max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères'),
});

export const createComment = authActionClient
	.schema(createCommentSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		try {
			const article = await prisma.article.findUnique({
				where: { id: input.articleId },
				select: { id: true, slug: true },
			});

			if (!article) {
				throw new SafeError('Article non trouvé');
			}

			await prisma.comment.create({
				data: {
					text: input.text,
					userId: user.id,
					articleId: input.articleId,
				},
			});

			revalidatePath(`/article/${article.slug}`);

			return { success: true };
		} catch (error) {
			console.error('Erreur lors de la création du commentaire:', error);
			if (error instanceof SafeError) {
				throw error;
			}
			throw new SafeError('Erreur lors de la création du commentaire');
		}
	});
