import { getCachedArticles } from '@/lib/data/articles';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

const categoryNames = {
	mode: 'Mode',
	soins: 'Soins',
	lifestyle: 'Lifestyle',
	culture: 'Culture',
};

export default async function ArticlesPage() {
	const articles = await getCachedArticles();

	return (
		<div className='bg-white'>
			<div className='bg-gray-50 py-16 md:py-24 mt-[64px] border-b border-gray-200'>
				<div className='container mx-auto px-4 md:px-6'>
					<div className='text-center mb-12'>
						<h1 className='text-4xl md:text-5xl font-serif font-bold mb-4 uppercase'>Tous les articles</h1>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto'>
							Découvrez tous nos articles sur la mode, les soins, le lifestyle et la culture masculine.
						</p>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 md:px-6 py-16'>
				{articles.length === 0 ? (
					<div className='text-center py-16'>
						<p className='text-gray-600 text-lg mb-8'>Aucun article trouvé pour le moment.</p>
						<Link
							href='/'
							className='inline-flex items-center px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors'>
							Retour à l'accueil
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{articles.map(article => (
							<Link
								key={article.id}
								href={`/article/${article.slug}`}
								className='group block bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-900'>
								<div className='relative h-64 overflow-hidden'>
									<Image
										src={article.heroImage}
										alt={article.heroImageAlt || article.title}
										fill
										className='object-cover transition-transform duration-300 group-hover:scale-105'
									/>
								</div>
								<div className='p-6'>
									<div className='flex items-center gap-2 mb-2'>
										<span className='text-xs font-medium uppercase tracking-wide text-gray-500'>
											{categoryNames[article.category as keyof typeof categoryNames]}
										</span>
										<span className='text-gray-300'>•</span>
										<div className='flex items-center text-xs text-gray-500'>
											<Clock
												size={12}
												className='mr-1'
											/>
											{article.readTime} min
										</div>
									</div>
									<h2 className='text-xl font-serif font-bold mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors'>
										{article.title}
									</h2>
									<p className='text-gray-600 line-clamp-3 leading-relaxed'>{article.excerpt}</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
