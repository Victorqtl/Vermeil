'use client';

import { useState } from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';

interface SavedArticlesProps {
	initialData: Article[];
}

export default function SavedArticles({ initialData }: SavedArticlesProps) {
	const [articles] = useState<Article[]>(initialData);

	if (articles.length === 0) {
		return (
			<div className='p-8 text-center text-gray-500'>
				<div className='mb-4'>
					<svg
						className='mx-auto h-12 w-12 text-gray-400'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
						/>
					</svg>
				</div>
				<h3 className='text-lg font-medium text-gray-900 mb-2'>Aucun article sauvegardé</h3>
				<p className='text-gray-500'>Commencez à sauvegarder des articles pour les retrouver ici.</p>
			</div>
		);
	}

	return (
		<div className='space-y-6 md:p-6'>
			<div className='grid gap-6'>
				{articles.map(article => (
					<article
						key={article.id}
						className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200'>
						<Link
							href={`/article/${article.slug}`}
							className='flex flex-col sm:flex-row h-80 sm:h-fit'>
							<div className='sm:basis-2/6'>
								<Image
									src={article.heroImage}
									alt={article.title}
									className='h-[130px] object-cover sm:min-h-full w-full'
									width={500}
									height={500}
								/>
							</div>
							<div className='h-[190px] sm:h-full p-6 sm:basis-4/6'>
								<div className='flex items-start justify-between'>
									<div>
										<div className='flex items-center gap-2 mb-2'>
											<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize'>
												{article.category}
											</span>
											<span className='text-sm text-gray-500'>
												{article.readTime} min de lecture
											</span>
										</div>

										<h2 className='text-xl font-semibold text-gray-900 mb-2 overflow-hidden line-clamp-3 sm:line-clamp-2'>
											{article.title}
										</h2>

										<p className='text-gray-500 text-sm'>
											{new Date(article.createdAt).toLocaleDateString('fr-FR')}
										</p>
									</div>
								</div>
							</div>
						</Link>
					</article>
				))}
			</div>
		</div>
	);
}
