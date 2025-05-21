'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
// import { useFormState, useFormStatus } from 'react-dom';
import { createArticleAction, type CreateArticleFormState } from './actions';

const initialState: CreateArticleFormState = {
	message: null,
	errors: {},
	success: false,
};

export default function NewArticlePage() {
	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		excerpt: '',
		description: '',
		heroImage: '',
		readTime: 5,
		featured: false,
		category: '',
	});

	const [state, formAction, pending] = useActionState(createArticleAction, initialState);

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

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-3xl font-bold'>Nouvel article</h1>
				<Link
					href='/admin/articles'
					className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
					Retour
				</Link>
			</div>

			{/* Display general errors from server action */}
			{state.message && !state.success && state.errors?.general && (
				<div className='mb-4 p-3 text-red-700 bg-red-100 border border-red-400'>
					<p>{state.errors.general.join(', ')}</p>
				</div>
			)}
			{state.message && !state.success && !state.errors?.general && (
				<div className='mb-4 p-3 text-red-700 bg-red-100 border border-red-400'>
					<p>{state.message}</p>
				</div>
			)}

			<form
				action={formAction}
				className='space-y-6 bg-white p-6 border border-gray-200'>
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
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						{state.errors?.title && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.title.join(', ')}</p>
						)}
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
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'article (auto-généré à partir du titre)</p>
						{state.errors?.slug && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.slug.join(', ')}</p>
						)}
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
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						{state.errors?.readTime && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.readTime.join(', ')}</p>
						)}
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
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						{state.errors?.excerpt && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.excerpt.join(', ')}</p>
						)}
					</div>

					{/* Description */}
					<div className='col-span-2'>
						<label
							htmlFor='description'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Description *
						</label>
						<textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleChange}
							rows={5}
							required
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						{state.errors?.description && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.description.join(', ')}</p>
						)}
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
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'image principale de l'article</p>
						{state.errors?.heroImage && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.heroImage.join(', ')}</p>
						)}
					</div>

					{/* Catégorie */}
					<div>
						<label
							htmlFor='category'
							className='block text-sm font-medium text-gray-700 mb-1'>
							Catégorie *
						</label>
						<select
							id='category'
							name='category'
							value={formData.category}
							onChange={handleChange}
							required
							// disabled={loadingCategories}
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed'>
							<option
								value=''
								disabled>
								Sélectionner une catégorie
							</option>
							<option value='Soins'>Soins</option>
						</select>
						{state.errors?.category && (
							<p className='mt-1 text-xs text-red-500'>{state.errors.category.join(', ')}</p>
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
							className='h-4 w-4 text-primary focus:ring-primary border-gray-300'
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
						className='px-4 py-2 border border-gray-300 hover:bg-gray-50'>
						Annuler
					</Link>
					<button
						type='submit'
						disabled={pending}
						className='bg-zinc-500 text-white px-4 py-2 cursor-pointer hover:bg-zinc-500/90 disabled:opacity-50 disabled:cursor-not-allowed'>
						{pending ? 'Enregistrement...' : 'Enregistrer'}
					</button>
				</div>
			</form>
		</div>
	);
}
