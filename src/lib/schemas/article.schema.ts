import { z } from 'zod';

export const createArticleSchema = z.object({
	title: z.string().trim().min(1, 'Le titre est requis').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
	slug: z
		.string()
		.trim()
		.min(1, 'Le slug est requis')
		.max(100, 'Le slug ne peut pas dépasser 100 caractères')
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets'
		)
		.refine(
			slug => !slug.startsWith('-') && !slug.endsWith('-'),
			'Le slug ne peut pas commencer ou finir par un tiret'
		),
	heroImage: z.string().trim().url("L'URL de l'image doit être une URL valide"),
	heroImageAlt: z.string().trim().min(1, "L'alt de l'image est requis"),
	readTime: z.coerce
		.number({
			required_error: 'Le temps de lecture est requis',
			invalid_type_error: 'Le temps de lecture doit être un nombre',
		})
		.int('Le temps de lecture doit être un nombre entier')
		.min(1, 'Le temps de lecture doit être au moins de 1 minute')
		.max(120, 'Le temps de lecture ne peut pas dépasser 120 minutes'),
	metaTitle: z
		.string()
		.trim()
		.min(1, 'Le titre meta est requis')
		.max(70, 'Le titre meta ne peut pas dépasser 70 caractères'),
	metaDescription: z
		.string()
		.trim()
		.min(10, 'La description meta doit contenir au moins 10 caractères')
		.max(155, 'La description meta ne peut pas dépasser 155 caractères'),
	category: z
		.string()
		.trim()
		.min(1, 'La catégorie est requise')
		.refine(
			category => ['Mode', 'Soins', 'Lifestyle', 'Culture'].includes(category),
			'Veuillez sélectionner une catégorie valide'
		),
	excerpt: z
		.string()
		.trim()
		.min(10, "L'extrait doit contenir au moins 10 caractères")
		.max(300, "L'extrait ne peut pas dépasser 300 caractères"),
	description: z
		.string()
		.trim()
		.min(50, 'La description doit contenir au moins 50 caractères')
		.max(5000, 'La description ne peut pas dépasser 5000 caractères'),
	featured: z.boolean(),
	sections: z
		.array(
			z.object({
				name: z.string().trim().min(1, 'Le nom de la section est requis'),
				description: z.string().trim().min(1, 'La description de la section est requise'),
				image: z
					.string()
					.trim()
					.refine(
						val => !val || z.string().url().safeParse(val).success,
						"L'URL de l'image doit être une URL valide"
					)
					.optional(),
				imageAlt: z.string().trim().optional(),
				link: z
					.string()
					.trim()
					.optional()
					.refine(
						val => !val || z.string().url().safeParse(val).success,
						"L'URL de la section doit être une URL valide"
					),
			})
		)
		.min(1, 'Au moins une section est requise')
		.refine(
			sections =>
				sections.every(section => {
					if (!section.image || section.image.trim() === '') return true;
					return section.imageAlt && section.imageAlt.trim() !== '';
				}),
			'Le texte alt est requis pour toutes les images de sections'
		),
});

export const updateArticleSchema = createArticleSchema.extend({
	id: z.string().min(1, "L'ID de l'article est requis"),
});

export type ArticleFormValues = z.infer<typeof createArticleSchema>;
export type UpdateArticleFormValues = z.infer<typeof updateArticleSchema>;
