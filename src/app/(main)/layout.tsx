import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className='flex-grow font-sans text-gray-900'>{children}</main>
			<Footer />
		</>
	);
}
