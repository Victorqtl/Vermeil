import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
	title: 'Tous les articles - Vermeil',
	description: 'Découvrez tous nos articles sur la mode, les soins, le lifestyle et la culture masculine.',
	openGraph: {
		title: 'Tous les articles - Vermeil',
		description: 'Découvrez tous nos articles sur la mode, les soins, le lifestyle et la culture masculine.',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tous les articles - Vermeil',
		description: 'Découvrez tous nos articles sur la mode, les soins, le lifestyle et la culture masculine.',
	},
};

interface ArticlesLayoutProps {
	children: React.ReactNode;
}

export default function ArticlesLayout({ children }: ArticlesLayoutProps) {
	return (
		<>
			<Header whiteHeader={true} />
			<main className='flex-grow font-sans bg-gray-50'>{children}</main>
			<Footer />
		</>
	);
}
