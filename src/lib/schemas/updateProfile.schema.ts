import { z } from 'zod';

export const updateProfileSchema = z.object({
	name: z
		.string()
		.min(1, 'Le nom est requis')
		.max(30, 'Le nom ne doit pas dépasser 30 caractères')
		.regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes')
		.trim(),
	email: z.string().email('Adresse e-mail invalide').toLowerCase().trim(),
});

export type UserProfileFormValues = z.infer<typeof updateProfileSchema>;
