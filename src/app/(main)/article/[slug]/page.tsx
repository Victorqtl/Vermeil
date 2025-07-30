import Image from 'next/image';
import { getCachedArticleBySlugWithoutSections } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/auth-session';
import SaveArticle from '@/app/(main)/article/components/save-article/SaveArticle';
import { getSavedArticlesById } from '@/lib/data/saved-articles';
import ArticleSections from '@/app/(main)/article/components/article-sections/ArticleSections';
import ArticleSectionsSkeleton from '@/app/(main)/article/components/article-sections/ArticleSectionsSkeleton';
import CommentsSection from '@/app/(main)/article/components/CommentsSection';
import CommentsSkeleton from '@/app/(main)/article/components/comments/CommentsSkeleton';
import RelatedArticles from '@/app/(main)/article/components/RelatedArticles';
import RelatedArticlesSkeleton from '@/app/(main)/article/components/RelatedArticlesSkeleton';
import { Suspense } from 'react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;

	const [article, user] = await Promise.all([
		getCachedArticleBySlugWithoutSections(resolvedParams.slug)(),
		getUser(),
	]);

	if (!article) {
		notFound();
	}

	const savedArticle = user?.id ? await getSavedArticlesById(user.id, article.id) : null;
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
				<SaveArticle
					articleId={article.id}
					savedArticle={savedArticle}
					user={user}
				/>
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
				<CommentsSection
					articleId={article.id}
					user={user || null}
				/>
			</Suspense>
		</article>
	);
}
