import { Metadata } from 'next';
import { getArticleBySlug } from '@/lib/data/articles';

interface ArticleLayoutProps {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const resolvedParams = await params;
	const article = await getArticleBySlug(resolvedParams.slug);

	if (!article) {
		return {
			title: 'Article non trouvé | Vermeil',
			description: "L'article que vous recherchez n'existe pas.",
		};
	}

	const { metaTitle, metaDescription, heroImage, heroImageAlt } = article;

	return {
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			images: [
				{
					url: heroImage,
					width: 1200,
					height: 630,
					alt: heroImageAlt,
				},
			],
			type: 'article',
			siteName: 'Vermeil',
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
			images: [heroImage],
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default async function ArticleLayout({ children }: ArticleLayoutProps) {
	return <>{children}</>;
}
