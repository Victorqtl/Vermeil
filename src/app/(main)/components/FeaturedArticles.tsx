import React from 'react';
import { Clock } from 'lucide-react';
import { getArticles } from '@/lib/data/articles';
import Link from 'next/link';

export default async function FeaturedArticles() {
	const articles = await getArticles();
	// Get first 3 featured articles for main grid
	const featuredArticles = articles.filter(article => article.featured).slice(0, 3);
	// Get next 3 articles for secondary section
	const secondaryArticles = articles.filter(article => !article.featured).slice(0, 3);

	return (
		<section className='bg-white py-16 md:py-24'>
			<div className='container mx-auto px-4 md:px-6'>
				<h2 className='text-3xl md:text-4xl font-serif font-bold mb-12 text-center uppercase'>À la une</h2>

				{/* Featured Grid - 3 articles in varied sizes */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 mb-16'>
					{featuredArticles.map((article, index) => (
						<div
							key={article.id}
							className={`group ${index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>
							<Link
								href={`/article/${article.slug}`}
								className='block relative'>
								<div className='relative overflow-hidden'>
									<div
										className='aspect-[16/9] bg-gray-200 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105'
										style={{ backgroundImage: `url(${article.heroImage})` }}
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80'></div>

									<div className='absolute bottom-0 left-0 p-6'>
										<span className='inline-block bg-white px-3 py-1 mb-3 text-xs font-medium text-black uppercase tracking-wider'>
											{article.category}
										</span>
										<h3 className='text-xl md:text-2xl lg:text-xl xl:text-2xl font-serif font-bold text-white mb-2'>
											{article.title}
										</h3>
										<div className='flex items-center text-white/80 text-sm'>
											<span>{article.createdAt.toLocaleDateString()}</span>
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

				{/* Secondary Articles Row */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{secondaryArticles.map(article => (
						<div
							key={article.id}
							className='group'>
							<Link
								href={`/article/${article.slug}`}
								className='block'>
								<div className='overflow-hidden mb-4'>
									<div
										className='aspect-[4/3] bg-gray-200 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105'
										style={{ backgroundImage: `url(${article.heroImage})` }}
									/>
								</div>
								<span className='inline-block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2'>
									{article.category}
								</span>
								<h3 className='text-lg font-serif font-medium mb-2 group-hover:text-gray-700 transition-colors'>
									{article.title}
								</h3>
								<p className='text-gray-600 text-sm mb-3 line-clamp-2'>{article.excerpt}</p>
								<div className='flex items-center text-gray-500 text-sm'>
									<span>{article.createdAt.toLocaleDateString()}</span>
									<span className='mx-2'>•</span>
									<Clock
										size={14}
										className='mr-1'
									/>
									<span>{article.readTime} min</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
