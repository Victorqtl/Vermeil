import { createSafeActionClient } from 'next-safe-action';
import { getUser } from '@/lib/auth-session';

export class SafeError extends Error {
	constructor(error: string) {
		super(error);
	}
}

export const actionClient = createSafeActionClient({
	handleServerError: error => {
		if (error instanceof SafeError) {
			return error.message;
		}
		return 'Une erreur est survenue';
	},
});

export const authActionClient = createSafeActionClient({
	handleServerError: error => {
		if (error instanceof SafeError) {
			return error.message;
		}
		return 'Une erreur est survenue';
	},
}).use(async ({ next }) => {
	const user = await getUser();
	if (!user) {
		throw new SafeError('Utilisateur non authentifié');
	}
	return next({ ctx: { user } });
});
