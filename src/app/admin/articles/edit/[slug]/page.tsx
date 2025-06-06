import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/data/articles';
import EditArticlePage from './components/EditArticleClient';

export default async function EditArticle({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const article = await getArticleBySlug(resolvedParams.slug);

	if (!article) {
		notFound();
	}

	return (
		<EditArticlePage
			initialData={{
				id: article.id,
				title: article.title,
				slug: article.slug,
				excerpt: article.excerpt,
				description: article.description,
				heroImage: article.heroImage,
				readTime: article.readTime,
				featured: article.featured,
				category: article.category,
				sections: article.sections,
			}}
		/>
	);
}
