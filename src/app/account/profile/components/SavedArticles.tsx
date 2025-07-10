'use client';

import { useState, useMemo } from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavedArticlesProps {
	initialData: Article[];
}

const ARTICLES_PER_PAGE = 6;

export default function SavedArticles({ initialData }: SavedArticlesProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [articles] = useState<Article[]>(initialData);

	// Pagination des articles
	const paginatedArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
		const endIndex = startIndex + ARTICLES_PER_PAGE;
		return articles.slice(startIndex, endIndex);
	}, [articles, currentPage]);

	const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll vers le haut pour une meilleure UX
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

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
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-semibold text-gray-900'>Mes articles sauvegardés ({articles.length})</h2>
				{totalPages > 1 && (
					<div className='flex items-center gap-2'>
						<Button
							variant='outlined'
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}>
							<ChevronLeft className='h-4 w-4' />
						</Button>
						<span className='text-sm text-gray-600'>
							Page {currentPage} sur {totalPages}
						</span>
						<Button
							variant='outlined'
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}>
							<ChevronRight className='h-4 w-4' />
						</Button>
					</div>
				)}
			</div>

			<div className='grid gap-6'>
				{paginatedArticles.map(article => (
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

			{/* Pagination en bas */}
			{totalPages > 1 && (
				<div className='flex justify-center items-center gap-2 mt-8'>
					<Button
						variant='outlined'
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						<ChevronLeft className='h-4 w-4 mr-2' />
						Précédent
					</Button>

					<div className='flex items-center gap-1'>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
							<Button
								key={page}
								variant={currentPage === page ? 'default' : 'outlined'}
								onClick={() => handlePageChange(page)}
								className='min-w-[40px]'>
								{page}
							</Button>
						))}
					</div>

					<Button
						variant='outlined'
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						Suivant
						<ChevronRight className='h-4 w-4 ml-2' />
					</Button>
				</div>
			)}
		</div>
	);
}
