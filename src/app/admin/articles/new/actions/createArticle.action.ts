'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createArticleSchema } from '@/lib/schemas/article.schema';

export const createArticle = authActionClient
	.schema(createArticleSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		if (user.role !== 'admin') {
			throw new SafeError("Vous n'avez pas les permissions nécessaires pour créer un article");
		}

		const { title, slug, heroImage, readTime, category, excerpt, description, featured } = input;

		try {
			const existingArticle = await prisma.article.findUnique({
				where: { slug },
			});

			if (existingArticle) {
				throw new SafeError('Un article avec ce slug existe déjà');
			}

			await prisma.article.create({
				data: {
					title,
					slug,
					excerpt: excerpt ?? null,
					description,
					heroImage,
					readTime,
					featured,
					category,
				},
			});
		} catch (error) {
			console.error("Erreur lors de la création de l'article:", error);
		}

		revalidatePath('/admin/articles');
		revalidatePath('/article', 'layout');
		redirect('/admin/articles');
	});
