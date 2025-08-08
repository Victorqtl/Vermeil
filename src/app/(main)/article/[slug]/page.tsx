import Image from 'next/image';
import { getCachedArticleBySlugWithoutSections } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import SaveArticleWrapper from '@/app/(main)/article/components/save-article/SaveArticleWrapper';
import SaveArticleSkeleton from '@/app/(main)/article/components/save-article/SaveArticleSkeleton';
import ArticleSections from '@/app/(main)/article/components/article-sections/ArticleSections';
import ArticleSectionsSkeleton from '@/app/(main)/article/components/article-sections/ArticleSectionsSkeleton';
import CommentsSectionWrapper from '@/app/(main)/article/components/comments/CommentsSectionWrapper';
import CommentsSkeleton from '@/app/(main)/article/components/comments/CommentsSkeleton';
import RelatedArticles from '@/app/(main)/article/components/related-articles/RelatedArticles';
import RelatedArticlesSkeleton from '@/app/(main)/article/components/related-articles/RelatedArticlesSkeleton';
import { Suspense } from 'react';
import { getCachedArticles } from '@/lib/data/articles';

export async function generateStaticParams() {
	const articles = await getCachedArticles();
	
	return articles.map((article) => ({
		slug: article.slug,
	}));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;

	const article = await getCachedArticleBySlugWithoutSections(resolvedParams.slug)();

	if (!article) {
		notFound();
	}
	return (
		<article className='min-h-screen bg-white'>
			{/* Hero Section */}
			<div className='relative h-[60vh] min-h-[500px] w-full'>
				<Image
					src={article.heroImage}
					alt={article.heroImageAlt}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='container mx-auto px-4 md:px-6 text-center'>
						<span className='inline-block bg-white px-4 py-2 mb-4 text-sm font-medium text-black uppercase tracking-wider'>
							{article.category}
						</span>
						<h1 className='text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
							{article.title}
						</h1>
						<div className='mt-6 text-white/90'>
							<span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
							<span className='mx-3'>•</span>
							<span>{article.readTime} min de lecture</span>
						</div>
					</div>
				</div>
			</div>

			<div className='px-4 md:px-6 py-16'>
				<Suspense fallback={<SaveArticleSkeleton />}>
					<SaveArticleWrapper articleId={article.id} />
				</Suspense>
				{/* Article Sections */}
				<Suspense fallback={<ArticleSectionsSkeleton />}>
					<ArticleSections
						slug={resolvedParams.slug}
						articleDescription={article.description}
					/>
				</Suspense>
			</div>

			{/* Related Articles Section */}
			<Suspense fallback={<RelatedArticlesSkeleton />}>
				<RelatedArticles currentArticleId={article.id} />
			</Suspense>

			{/* Comments Section */}
			<Suspense fallback={<CommentsSkeleton />}>
				<CommentsSectionWrapper articleId={article.id} />
			</Suspense>
		</article>
	);
}
