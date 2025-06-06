'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const deleteArticleSchema = z.object({
	id: z.string().min(1, "ID de l'article requis"),
});

export const deleteArticle = authActionClient
	.schema(deleteArticleSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		if (user.role !== 'admin') {
			throw new SafeError("Vous n'avez pas les permissions nécessaires pour supprimer un article");
		}

		const { id } = input;

		const existingArticle = await prisma.article.findUnique({
			where: { id },
			select: { id: true, title: true },
		});

		if (!existingArticle) {
			throw new SafeError("L'article à supprimer n'existe pas");
		}

		try {
			await prisma.article.delete({
				where: { id },
			});
		} catch (error) {
			console.error("Erreur lors de la suppression de l'article:", error);
			throw new SafeError("Erreur lors de la suppression de l'article");
		}

		revalidatePath('/admin/articles');
		revalidatePath('/article', 'layout');
		redirect('/admin/articles');
	});
