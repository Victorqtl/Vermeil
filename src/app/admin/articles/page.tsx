import Link from 'next/link';
import { getArticles } from '@/lib/data/articles';
import { ArrowRight } from 'lucide-react';

export default async function ArticlesListPage() {
	const articles = await getArticles();

	const formatDate = (dateInput: string | Date) => {
		const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
		return new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(date);
	};

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Articles</h1>
				<Link
					href='/admin/articles/new'
					className='flex items-center gap-2 px-6 py-3 transition-colors group bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'>
					<span>Nouvel article</span>
					<ArrowRight
						size={18}
						className='group-hover:translate-x-1 transition-transform duration-200'
					/>
				</Link>
			</div>

			{/*Mettre Suspense  */}
			{/* <div className='text-center py-10'>
					<p className='text-gray-600'>Chargement des articles...</p>
				</div> */}
			{articles.length === 0 ? (
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
					<h3 className='text-lg font-medium text-gray-900 mb-2'>Aucun article </h3>
					<p className='text-gray-500'>Commencez à écrire des articles pour les retrouver ici.</p>
				</div>
			) : (
				<div className='bg-white border border-gray-200 overflow-hidden'>
					<table className='min-w-full divide-y divide-gray-200'>
						<thead className='bg-gray-50'>
							<tr>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Titre
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Catégorie
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Date
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Statut
								</th>
								<th
									scope='col'
									className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{articles.map(article => (
								<tr key={article.id}>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm font-medium text-gray-900'>{article.title}</div>
										<div className='text-sm text-gray-500'>{article.slug}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-900'>{article.category}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-900'>{formatDate(article.createdAt)}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										{article.featured ? (
											<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
												Mis en avant
											</span>
										) : (
											<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800'>
												Standard
											</span>
										)}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
										<Link
											href={`/admin/articles/edit/${article.id}`}
											className='text-indigo-600 hover:text-indigo-900 mr-4'>
											Modifier
										</Link>
										<Link
											href={`/article/${article.slug}`}
											className='text-gray-600 hover:text-gray-900 mr-4'
											target='_blank'>
											Voir
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
