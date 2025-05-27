import Link from 'next/link';
import ArrowLinkButton from '../../../components/ui/arrow-link-button';
import { getArticles } from '@/lib/data-access/articles';

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
				<ArrowLinkButton
					variant='bordered'
					href='/admin/articles/new'
					text='Nouvel article'
				/>
			</div>

			{/*Mettre Suspense  */}
			{/* <div className='text-center py-10'>
					<p className='text-gray-600'>Chargement des articles...</p>
				</div> */}
			{articles.length === 0 ? (
				<div className='text-center py-10 bg-gray-50'>
					<p className='text-gray-600 mb-4'>Aucun article trouvé</p>
					<Link
						href='/admin/articles/new'
						className='bg-gray-200 px-4 py-2 hover:bg-gray-200/90'>
						Créer votre premier article
					</Link>
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
