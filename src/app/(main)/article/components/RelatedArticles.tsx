import React from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { getCachedFeaturedArticlesExcluding } from '@/lib/data/articles';

interface RelatedArticlesProps {
	currentArticleId: string;
}

export default async function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
	const relatedArticles = await getCachedFeaturedArticlesExcluding(currentArticleId, 3)();

	if (relatedArticles.length === 0) {
		return null;
	}

	return (
		<div className='py-16'>
			<div className='max-w-7xl mx-auto px-4 md:px-6'>
				<h2 className='text-3xl font-serif font-bold mb-12 text-center uppercase'>Vermeil recommande</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{relatedArticles.map(article => (
						<div
							key={article.id}
							className='group'>
							<Link
								href={`/article/${article.slug}`}
								className='block relative'>
								<div className='relative overflow-hidden'>
									<div
										className='aspect-[4/3] bg-gray-200 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105'
										style={{ backgroundImage: `url(${article.heroImage})` }}
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80'></div>

									<div className='absolute bottom-0 left-0 p-6'>
										<span className='inline-block bg-white px-3 py-1 mb-3 text-xs font-medium text-black uppercase tracking-wider'>
											{article.category}
										</span>
										<h3 className='text-lg font-serif font-bold text-white mb-2'>
											{article.title}
										</h3>
										<p className='text-white text-sm leading-relaxed mb-2 line-clamp-2'>
											{article.excerpt}
										</p>
										<div className='flex items-center text-white/80 text-sm'>
											<span>{new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
											<span className='mx-2'>•</span>
											<Clock
												size={14}
												className='mr-1'
											/>
											<span>{article.readTime} min de lecture</span>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
