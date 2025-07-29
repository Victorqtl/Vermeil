'use server';

import { prisma } from '@/lib/prisma';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { revalidatePath } from 'next/cache';
import { updateProfileSchema } from '@/lib/schemas/updateProfile.schema';

export const updateProfile = authActionClient
	.schema(updateProfileSchema)
	.action(async ({ parsedInput: input, ctx }) => {
		const user = ctx.user;

		try {
			if (input.email !== user.email) {
				const existingUser = await prisma.user.findUnique({
					where: { email: input.email },
					select: { id: true },
				});

				if (existingUser && existingUser.id !== user.id) {
					throw new SafeError('Cette adresse e-mail est déjà utilisée');
				}
			}

			if (input.name === user.name && input.email === user.email) {
				return;
			}

			await prisma.user.update({
				where: { id: user.id },
				data: {
					name: input.name,
					email: input.email,
					updatedAt: new Date(),
				},
				select: {
					id: true,
					name: true,
					email: true,
					updatedAt: true,
				},
			});

			revalidatePath('/account/profile');
		} catch (error) {
			if (error instanceof SafeError) {
				throw error;
			}
			console.error('Erreur lors de la mise à jour du profil:', error);

			throw new SafeError('Erreur lors de la mise à jour du profil');
		}
	});
