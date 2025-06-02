'use server';

import { prisma } from '@/lib/prisma';
import { uploadFileToS3 } from '@/utils/s3-utils';
import { authActionClient, SafeError } from '@/lib/safe-actions';
import { zfd } from 'zod-form-data';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const DEFAULT_AVATAR_URL =
	'https://media.istockphoto.com/id/1194657244/vector/business-man-icon-male-face-silhouette-with-office-suit-and-tie-user-avatar-profile-vector.jpg?s=612x612&w=0&k=20&c=D-8JhQ1SF0ju-3QPAEsnXzutbaJtWicunTGMCmFLFmg=';

const formSchema = zfd.formData({
	file: zfd.file().optional(),
});

export const uploadAvatar = authActionClient.schema(formSchema).action(async ({ parsedInput, ctx }) => {
	const user = ctx.user;

	const file = parsedInput.file;

	if (!file) {
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				image: DEFAULT_AVATAR_URL,
			},
		});
		return {
			url: DEFAULT_AVATAR_URL,
		};
	}

	if (!(file instanceof File)) {
		throw new SafeError('Fichier invalide');
	}

	if (file.size > MAX_FILE_SIZE) {
		throw new SafeError(
			`Le fichier est trop volumineux. Taille maximale autorisée : ${MAX_FILE_SIZE / (1024 * 1024)}MB`
		);
	}

	if (!ALLOWED_MIME_TYPES.includes(file.type)) {
		throw new SafeError('Type de fichier non autorisé. Formats acceptés : JPEG, PNG, WebP');
	}

	if (!/^[a-zA-Z0-9._\s-]+$/.test(file.name)) {
		throw new SafeError('Nom de fichier invalide.');
	}

	try {
		const fileUrl = await uploadFileToS3({
			contentType: file.type,
			file: file,
			path: `users/${user.id}/avatar`,
		});

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				image: fileUrl,
			},
		});

		return {
			url: fileUrl,
		};
	} catch (error) {
		console.error("Erreur lors de l'upload d'avatar:", error);
		throw new SafeError("Échec de l'upload du fichier. Veuillez réessayer.");
	}
});
