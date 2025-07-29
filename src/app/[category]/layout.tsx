import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const validCategories = ['mode', 'soins', 'lifestyle', 'culture'];

const categoryNames = {
	mode: 'Mode',
	soins: 'Soins',
	lifestyle: 'Lifestyle',
	culture: 'Culture',
};

const categoryDescriptions = {
	mode: 'Tendances, conseils et inspirations pour affirmer votre style',
	soins: 'Produits et rituels pour prendre soin de vous au quotidien',
	lifestyle: 'Art de vivre, déco et bien-être pour un quotidien raffiné',
	culture: 'Livres, films, musique et événements qui façonnent notre époque',
};

interface CategoryLayoutProps {
	children: React.ReactNode;
	params: Promise<{
		category: string;
	}>;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
	const { category } = await params;

	if (!validCategories.includes(category)) {
		return {
			title: 'Catégorie non trouvée - Vermeil',
			description: "Cette catégorie n'existe pas.",
		};
	}

	const categoryName = categoryNames[category as keyof typeof categoryNames];
	const categoryDescription = categoryDescriptions[category as keyof typeof categoryDescriptions];

	return {
		title: `${categoryName} - Vermeil`,
		description: categoryDescription,
		openGraph: {
			title: `${categoryName} - Vermeil`,
			description: categoryDescription,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: `${categoryName} - Vermeil`,
			description: categoryDescription,
		},
	};
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
	const { category } = await params;

	if (!validCategories.includes(category)) {
		notFound();
	}

	return (
		<>
			<Header whiteHeader={true} />
			<main className='flex-grow font-sans'>{children}</main>
			<Footer />
		</>
	);
}
