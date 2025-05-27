'use server';

import { prisma } from '@/lib/prisma';
import { actionClient, SafeError } from '@/lib/safe-actions';
import { getUser } from '@/lib/auth-session';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(1, 'Le nom est requis').max(30, 'Le nom ne doit pas dépasser 30 caractères'),
	email: z.string().email('Adresse e-mail invalide'),
});

export const updateProfile = actionClient.schema(formSchema).action(async ({ parsedInput: input }) => {
	const user = await getUser();
	if (!user) throw new SafeError('Non authentifié');

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
