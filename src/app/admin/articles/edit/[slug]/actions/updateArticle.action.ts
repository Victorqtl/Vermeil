'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateArticleSchema } from '@/lib/schemas/article.schema';

export const updateArticle = authActionClient
	.schema(updateArticleSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		if (user.role !== 'admin') {
			throw new SafeError("Vous n'avez pas les permissions nécessaires pour modifier un article");
		}

		const { id, title, slug, heroImage, readTime, category, excerpt, description, featured, sections } = input;

		const existingArticle = await prisma.article.findUnique({
			where: { id },
			select: { id: true, slug: true },
		});

		if (!existingArticle) {
			throw new SafeError("L'article à modifier n'existe pas");
		}

		if (existingArticle.slug !== slug) {
			const conflictingArticle = await prisma.article.findUnique({
				where: { slug },
				select: { id: true },
			});

			if (conflictingArticle) {
				throw new SafeError('Un article avec ce slug existe déjà');
			}
		}

		try {
			await prisma.$transaction(async tx => {
				await tx.section.deleteMany({
					where: { articleId: id },
				});

				await tx.article.update({
					where: { id },
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
				});
			});
		} catch (error) {
			console.error("Erreur lors de la modification de l'article:", error);
			throw new SafeError("Erreur lors de la modification de l'article");
		}

		revalidatePath('/admin/articles');
		revalidatePath('/article', 'layout');
		revalidatePath(`/article/${slug}`, 'page');
		redirect('/admin/articles');
	});
