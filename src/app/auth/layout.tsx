import { getUser } from '@/lib/auth-session';
import { redirect, unauthorized } from 'next/navigation';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
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
