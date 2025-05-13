import Link from 'next/link';

export default function AdminDashboard() {
	return (
		<div className='max-w-6xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Administration</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='border border-gray-200 rounded-lg p-6 shadow-sm'>
					<h2 className='text-xl font-semibold mb-4'>Articles</h2>
					<p className='text-gray-600 mb-4'>Gérer les articles du site</p>
					<div className='flex space-x-3'>
						<Link
							href='/admin/articles/new'
							className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90'>
							Nouvel article
						</Link>
						<Link
							href='/admin/articles'
							className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50'>
							Voir tous
						</Link>
					</div>
				</div>

				<div className='border border-gray-200 rounded-lg p-6 shadow-sm'>
					<h2 className='text-xl font-semibold mb-4'>Catégories</h2>
					<p className='text-gray-600 mb-4'>Gérer les catégories d'articles</p>
					<div className='flex space-x-3'>
						<Link
							href='/admin/categories/new'
							className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90'>
							Nouvelle catégorie
						</Link>
						<Link
							href='/admin/categories'
							className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50'>
							Voir toutes
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
