'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const deleteCommentSchema = z.object({
	commentId: z.string(),
});

export const deleteComment = authActionClient
	.schema(deleteCommentSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		try {
			const comment = await prisma.comment.findUnique({
				where: { id: input.commentId },
				select: {
					id: true,
					userId: true,
					article: {
						select: { id: true },
					},
				},
			});

			if (!comment) {
				throw new SafeError('Commentaire non trouvé');
			}

			if (comment.userId !== user.id) {
				throw new SafeError('Vous ne pouvez pas supprimer ce commentaire');
			}

			await prisma.comment.delete({
				where: { id: input.commentId },
			});

			revalidateTag(`comments-${comment.article.id}`);

			return { success: true };
		} catch (error) {
			console.error('Erreur lors de la suppression du commentaire:', error);
			if (error instanceof SafeError) {
				throw error;
			}
			throw new SafeError('Erreur lors de la suppression du commentaire');
		}
	});
