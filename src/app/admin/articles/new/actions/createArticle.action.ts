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

		const { title, slug, heroImage, readTime, category, excerpt, description, featured, sections } = input;

		const existingArticle = await prisma.article.findUnique({
			where: { slug },
			select: { id: true },
		});

		if (existingArticle) {
			throw new SafeError('Un article avec ce slug existe déjà');
		}

		try {
			await prisma.article.create({
				data: {
					title,
					slug,
					excerpt,
					description,
					heroImage,
					readTime,
					featured,
					category,
					sections: {
						create: sections.map(section => ({
							name: section.name,
							description: section.description,
							image: section.image,
							link: section.link,
						})),
					},
				},
				select: { id: true, slug: true },
			});
		} catch (error) {
			console.error("Erreur lors de la création de l'article:", error);
			throw new SafeError("Erreur lors de la création de l'article");
		}

		revalidatePath('/admin/articles');
		revalidatePath('/article', 'layout');
		redirect('/admin/articles');
	});
