'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
	id: string;
	name: string;
}

export default function NewArticlePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		excerpt: '',
		heroImage: '',
		readTime: 5,
		featured: false,
		categoryId: '',
	});

	// Charger les catégories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch('/api/categories');
				if (!response.ok) {
					throw new Error('Failed to fetch categories');
				}
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			} finally {
				setLoadingCategories(false);
			}
		};

		fetchCategories();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));

		// Auto-generate slug from title
		if (name === 'title') {
			const slug = value
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-');

			setFormData(prev => ({
				...prev,
				slug,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to create article');
			}

			router.push('/admin/articles');
			router.refresh();
		} catch (error) {
			console.error('Error creating article:', error);
			alert(error instanceof Error ? error.message : 'Failed to create article. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Nouvel article</h1>
				<Link
					href='/admin/articles'
					className='bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200'>
					Retour
				</Link>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6 bg-white p-6 rounded-lg border border-gray-200'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Titre */}
					<div className='col-span-2'>
						<label
							htmlFor='title'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Titre *
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>

					{/* Slug */}
					<div>
						<label
							htmlFor='slug'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Slug *
						</label>
						<input
							type='text'
							id='slug'
							name='slug'
							value={formData.slug}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'article (auto-généré à partir du titre)</p>
					</div>

					{/* Temps de lecture */}
					<div>
						<label
							htmlFor='readTime'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Temps de lecture (minutes) *
						</label>
						<input
							type='number'
							id='readTime'
							name='readTime'
							value={formData.readTime}
							onChange={handleChange}
							min='1'
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>

					{/* Extrait */}
					<div className='col-span-2'>
						<label
							htmlFor='excerpt'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Extrait
						</label>
						<textarea
							id='excerpt'
							name='excerpt'
							value={formData.excerpt}
							onChange={handleChange}
							rows={3}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
					</div>

					{/* Image héroïque */}
					<div className='col-span-2'>
						<label
							htmlFor='heroImage'
							className='block text-sm font-medium text-gray-700 mb-1'>
							URL de l'image héroïque *
						</label>
						<input
							type='url'
							id='heroImage'
							name='heroImage'
							value={formData.heroImage}
							onChange={handleChange}
							required
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'image principale de l'article</p>
					</div>

					{/* Catégorie */}
					<div>
						<label
							htmlFor='categoryId'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Catégorie *
						</label>
						<select
							id='categoryId'
							name='categoryId'
							value={formData.categoryId}
							onChange={handleChange}
							required
							disabled={loadingCategories}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'>
							<option
								value=''
								disabled>
								{loadingCategories ? 'Chargement des catégories...' : 'Sélectionner une catégorie'}
							</option>
							{categories.map(category => (
								<option
									key={category.id}
									value={category.id}>
									{category.name}
								</option>
							))}
						</select>
						{categories.length === 0 && !loadingCategories && (
							<p className='mt-1 text-xs text-red-500'>
								Aucune catégorie disponible.
								<Link
									href='/admin/categories/new'
									className='text-primary hover:underline ml-1'>
									Créer une catégorie
								</Link>
							</p>
						)}
					</div>

					{/* Mise en avant */}
					<div className='flex items-center'>
						<input
							type='checkbox'
							id='featured'
							name='featured'
							checked={formData.featured}
							onChange={handleChange}
							className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
						/>
						<label
							htmlFor='featured'
							className='ml-2 block text-sm text-gray-700'>
							Article mis en avant
						</label>
					</div>
				</div>

				{/* Boutons d'action */}
				<div className='flex justify-end space-x-3'>
					<Link
						href='/admin/articles'
						className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50'>
						Annuler
					</Link>
					<button
						type='submit'
						disabled={loading || loadingCategories || categories.length === 0}
						className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'>
						{loading ? 'Enregistrement...' : 'Enregistrer'}
					</button>
				</div>
			</form>
		</div>
	);
}
