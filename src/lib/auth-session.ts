import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getUser = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session?.user;
};

export const isAdmin = async () => {
	const user = await getUser();
	if (!user) {
		redirect('/auth/sign-in');
	}
	if (user.role !== 'admin') {
		redirect('/unauthorized');
	} else {
		return user;
	}
};
