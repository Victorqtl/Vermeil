'use client';

import { useState } from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';

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
		<div className='space-y-6 p-6'>
			<div className='grid gap-6'>
				{articles.map(article => (
					<article
						key={article.id}
						className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200'>
						<Link
							href={`/article/${article.slug}`}
							className='flex'>
							{/* Image */}
							<div className='flex-shrink-0 w-48 h-32'>
								<img
									src={article.heroImage}
									alt={article.title}
									className='w-full h-full object-cover'
								/>
							</div>

							{/* Contenu */}
							<div className='flex-1 p-6'>
								<div className='flex items-start justify-between'>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-2'>
											<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize'>
												{article.category}
											</span>
											<span className='text-sm text-gray-500'>
												{article.readTime} min de lecture
											</span>
										</div>

										<h3
											className='text-xl font-semibold text-gray-900 mb-2 overflow-hidden'
											style={{
												display: '-webkit-box',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical',
											}}>
											{article.title}
										</h3>

										{article.excerpt && (
											<p
												className='text-gray-600 text-sm mb-3 overflow-hidden'
												style={{
													display: '-webkit-box',
													WebkitLineClamp: 2,
													WebkitBoxOrient: 'vertical',
												}}>
												{article.excerpt}
											</p>
										)}

										<p className='text-gray-500 text-sm'>
											Sauvegardé le{' '}
											{new Date(article.createdAt).toLocaleDateString('fr-FR', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</p>
									</div>

									{/* Actions */}
									<div className='flex items-center gap-2 ml-4'>
										<button className='p-2 text-gray-400 hover:text-red-500 transition-colors'>
											<svg
												className='w-5 h-5'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'
													clipRule='evenodd'
												/>
												<path
													fillRule='evenodd'
													d='M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 3a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z'
													clipRule='evenodd'
												/>
											</svg>
										</button>
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
