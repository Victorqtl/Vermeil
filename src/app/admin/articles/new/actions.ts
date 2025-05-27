'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ArticleSchema = z.object({
	title: z.string().min(1, 'Le titre est requis'),
	slug: z.string().min(1, 'Le slug est requis'),
	heroImage: z.string().url("L'URL de l'image héroïque doit être une URL valide"),
	readTime: z.coerce.number().int().min(1, 'Le temps de lecture doit être au moins de 1 minute'),
	category: z.string().min(1, 'La catégorie est requise'),
	excerpt: z.string().optional().nullable(),
	description: z.string().min(1, 'La description est requise'),
	featured: z.boolean().default(false),
});

export type CreateArticleFormState = {
	message: string | null;
	errors?: {
		title?: string[];
		slug?: string[];
		heroImage?: string[];
		readTime?: string[];
		category?: string[];
		excerpt?: string[];
		description?: string[];
		general?: string[];
	};
	success: boolean;
};

export async function createArticleAction(
	_prevState: CreateArticleFormState,
	formData: FormData
): Promise<CreateArticleFormState> {
	const rawFormData = {
		title: formData.get('title'),
		slug: formData.get('slug'),
		excerpt: formData.get('excerpt') || null,
		description: formData.get('description'),
		heroImage: formData.get('heroImage'),
		readTime: formData.get('readTime'),
		category: formData.get('category'),
		featured: formData.get('featured') === 'on',
		categoryId: formData.get('categoryId'),
	};

	const validatedFields = ArticleSchema.safeParse(rawFormData);

	if (!validatedFields.success) {
		return {
			message: 'La validation a échoué. Veuillez vérifier les champs.',
			errors: validatedFields.error.flatten().fieldErrors,
			success: false,
		};
	}

	const { title, slug, heroImage, readTime, category, excerpt, description, featured } = validatedFields.data;

	try {
		const existingArticle = await prisma.article.findUnique({
			where: { slug },
		});

		if (existingArticle) {
			return {
				message: 'Un article avec ce slug existe déjà.',
				errors: { slug: ['Un article avec ce slug existe déjà.'] },
				success: false,
			};
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
		return {
			message: "Échec de la création de l'article. Veuillez réessayer plus tard.",
			errors: { general: ['Une erreur inattendue est survenue.'] },
			success: false,
		};
	}

	revalidatePath('/admin/articles');
	revalidatePath('/article', 'layout');
	redirect('/admin/articles');
}
