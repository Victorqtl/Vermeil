import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header darkMode={true} />
			<main className='flex-grow font-sans mt-[69px] bg-gray-100 text-gray-900'>{children}</main>
			<Footer />
		</>
	);
}
