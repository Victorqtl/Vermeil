import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getUser } from '@/lib/auth-session';
import { redirect } from 'next/navigation';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
	const user = await getUser();
	if (!user) {
		redirect('/auth/sign-in');
	}
	return (
		<>
			<Header darkMode={true} />
			<main className='flex justify-center flex-grow font-sans mt-[69px] bg-gray-50'>{children}</main>
			<Footer />
		</>
	);
}
