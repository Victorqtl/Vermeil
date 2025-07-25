'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const updateCommentSchema = z.object({
	commentId: z.string(),
	text: z
		.string()
		.min(1, 'Le commentaire ne peut pas être vide')
		.max(1000, 'Le commentaire ne peut pas dépasser 1000 caractères'),
});

export const updateComment = authActionClient
	.schema(updateCommentSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		try {
			const comment = await prisma.comment.findUnique({
				where: { id: input.commentId },
				select: {
					id: true,
					userId: true,
					article: {
						select: { slug: true },
					},
				},
			});

			if (!comment) {
				throw new SafeError('Commentaire non trouvé');
			}

			if (comment.userId !== user.id) {
				throw new SafeError('Vous ne pouvez pas modifier ce commentaire');
			}

			await prisma.comment.update({
				where: { id: input.commentId },
				data: {
					text: input.text,
					updatedAt: new Date(),
				},
			});

			revalidatePath(`/article/${comment.article.slug}`);

			return { success: true };
		} catch (error) {
			console.error('Erreur lors de la modification du commentaire:', error);
			if (error instanceof SafeError) {
				throw error;
			}
			throw new SafeError('Erreur lors de la modification du commentaire');
		}
	});
