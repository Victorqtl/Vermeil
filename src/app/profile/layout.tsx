import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header whiteHeader={true} />
			<main className='flex justify-center flex-grow font-sans mt-[64px] bg-gray-50'>{children}</main>
			<Footer />
		</>
	);
}
