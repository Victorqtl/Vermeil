'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(1, 'Le nom est requis').max(30, 'Le nom ne doit pas dépasser 30 caractères'),
	email: z.string().email('Adresse e-mail invalide'),
});

export const updateProfile = authActionClient.schema(formSchema).action(async ({ parsedInput: input, ctx }) => {
	await new Promise(resolve => setTimeout(resolve, 3000));
	const user = ctx.user;

	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			name: input.name,
			email: input.email,
		},
	});

	revalidatePath('/account/profile');
});
