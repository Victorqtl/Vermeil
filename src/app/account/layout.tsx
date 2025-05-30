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
			<Header darkMode={true} />
			<main className='flex justify-center flex-grow font-sans mt-[69px] bg-gray-50'>{children}</main>
			<Footer />
		</>
	);
}
