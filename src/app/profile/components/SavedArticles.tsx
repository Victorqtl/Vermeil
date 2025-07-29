'use client';

import { useEffect, useState } from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function SavedArticles() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadArticles = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch('/api/user/saved-articles');

				if (!response.ok) {
					throw new Error('Erreur lors du chargement des articles');
				}

				const data = await response.json();
				setArticles(data.articles || []);
			} catch (err) {
				console.error('Erreur lors du chargement des articles:', err);
				setError('Impossible de charger les articles sauvegardés');
			} finally {
				setIsLoading(false);
			}
		};

		loadArticles();
	}, []);

	if (isLoading) {
		return (
			<div className='p-8 text-center'>
				<Loader2 className='mx-auto h-8 w-8 animate-spin text-gray-400 mb-4' />
				<p className='text-gray-500'>Chargement de vos articles sauvegardés...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='p-8 text-center text-red-500'>
				<p className='text-lg font-medium mb-2'>Erreur</p>
				<p className='text-sm'>{error}</p>
			</div>
		);
	}

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
		<div className='max-h-[380px] lg:max-h-[300px] overflow-y-auto space-y-6 md:p-6'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold text-gray-900'>Mes articles sauvegardés ({articles.length})</h2>
			</div>

			<div className='grid gap-6'>
				{articles.map(article => (
					<article
						key={article.id}
						className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200'>
						<Link
							href={`/article/${article.slug}`}
							className='flex flex-col sm:flex-row h-80 sm:h-fit'>
							<div className='sm:basis-2/6 relative'>
								<Image
									src={article.heroImage}
									alt={article.title}
									className='h-[130px] object-cover sm:min-h-full w-full'
									width={400}
									height={300}
									loading='lazy'
									placeholder='blur'
									blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
									sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
									priority={false}
								/>
							</div>
							<div className='h-[190px] sm:h-full p-6 sm:basis-4/6'>
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

										<h2 className='text-xl font-semibold text-gray-900 mb-2 overflow-hidden line-clamp-3 sm:line-clamp-2 hover:text-blue-600 transition-colors'>
											{article.title}
										</h2>

										<p className='text-gray-600 text-sm mb-3 line-clamp-2'>{article.description}</p>

										<p className='text-gray-500 text-sm'>
											{new Date(article.createdAt).toLocaleDateString('fr-FR', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
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
