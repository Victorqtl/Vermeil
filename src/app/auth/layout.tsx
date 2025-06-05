import { getUser } from '@/lib/auth-session';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await getUser();

	if (session) {
		redirect('/');
	}
	return (
		<>
			<main>{children}</main>
		</>
	);
}
