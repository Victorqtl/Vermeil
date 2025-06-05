import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getUser } from '@/lib/auth-session';
import { unauthorized } from 'next/navigation';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await getUser();
	const admin = session?.role === 'admin';

	if (!admin) {
		unauthorized();
	}

	return (
		<>
			<Header />
			<main className='flex-grow font-sans text-gray-900'>{children}</main>
			<Footer />
		</>
	);
}
