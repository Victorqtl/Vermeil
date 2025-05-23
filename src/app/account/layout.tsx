import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header darkMode={true} />
			<main className='flex-grow font-sans mt-[69px] text-gray-900'>{children}</main>
			<Footer />
		</>
	);
}
