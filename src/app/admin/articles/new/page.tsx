'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { createArticle } from './actions/createArticle.action';
import { createArticleSchema, type ArticleFormValues } from '@/lib/schemas/article.schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewArticlePage() {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(createArticle);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isDirty, isValid },
	} = useForm<ArticleFormValues>({
		resolver: zodResolver(createArticleSchema),
		defaultValues: {
			readTime: 5,
			featured: false,
		},
		mode: 'onChange',
	});

	const generateSlug = (title: string): string => {
		return title
			.toLowerCase()
			.trim()
			.replace(/[\s\-_]+/g, '-')
			.replace(/[^\w\-]+/g, '')
			.replace(/\-\-+/g, '-')
			.replace(/^-+/, '')
			.replace(/-+$/, '');
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		const newSlug = generateSlug(title);
		setValue('slug', newSlug, { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<ArticleFormValues> = async data => {
		try {
			await executeAsync(data);
		} catch (error) {
			console.error('Erreur lors de la soumission:', error);
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-4xl font-bold'>Nouvel article</h1>
				<Link
					href='/admin/articles'
					className='inline-flex items-center bg-white text-gray-900 px-6 py-3 border border-gray-200 font-medium hover:bg-gray-100 transition-colors group'>
					<ArrowLeft
						size={18}
						className='mr-2 transition-transform duration-200 group-hover:-translate-x-1'
					/>
					Retour
				</Link>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-6 bg-white p-6 border border-gray-200'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='col-span-2'>
						<Label htmlFor='title'>Titre *</Label>
						<Input
							type='text'
							id='title'
							{...register('title', {
								onChange: handleTitleChange,
							})}
							className='w-full'
							aria-invalid={!!errors.title}
						/>
						{errors.title && <p className='mt-1 text-xs text-red-500'>{errors.title.message}</p>}
					</div>

					<div>
						<Label htmlFor='slug'>Slug *</Label>
						<Input
							type='text'
							id='slug'
							{...register('slug')}
							className='w-full'
							aria-invalid={!!errors.slug}
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'article (auto-généré à partir du titre)</p>
						{errors.slug && <p className='mt-1 text-xs text-red-500'>{errors.slug.message}</p>}
					</div>

					<div>
						<Label htmlFor='readTime'>Temps de lecture (minutes) *</Label>
						<Input
							type='number'
							id='readTime'
							{...register('readTime')}
							min='1'
							className='w-full'
							aria-invalid={!!errors.readTime}
						/>
						{errors.readTime && <p className='mt-1 text-xs text-red-500'>{errors.readTime.message}</p>}
					</div>

					<div className='col-span-2'>
						<Label htmlFor='excerpt'>Extrait</Label>
						<textarea
							id='excerpt'
							{...register('excerpt')}
							rows={3}
							className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent ${
								errors.excerpt && 'border-red-500 focus:ring-red-500'
							}`}
						/>
						{errors.excerpt && <p className='mt-1 text-xs text-red-500'>{errors.excerpt.message}</p>}
					</div>

					<div className='col-span-2'>
						<Label htmlFor='description'>Description *</Label>
						<textarea
							id='description'
							{...register('description')}
							rows={6}
							className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent ${
								errors.description && 'border-red-500 focus:ring-red-500'
							}`}
							aria-invalid={!!errors.description}
						/>
						{errors.description && (
							<p className='mt-1 text-xs text-red-500'>{errors.description.message}</p>
						)}
					</div>

					<div className='col-span-2'>
						<Label htmlFor='heroImage'>URL de l'image héroïque *</Label>
						<Input
							type='url'
							id='heroImage'
							{...register('heroImage')}
							className='w-full'
							aria-invalid={!!errors.heroImage}
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'image principale de l'article</p>
						{errors.heroImage && <p className='mt-1 text-xs text-red-500'>{errors.heroImage.message}</p>}
					</div>

					<div>
						<Label htmlFor='category'>Catégorie *</Label>
						<select
							id='category'
							{...register('category')}
							className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer'>
							<option
								value=''
								disabled>
								Sélectionner une catégorie
							</option>
							<option value='Mode'>Mode</option>
							<option value='Soins'>Soins</option>
							<option value='Lifestyle'>Lifestyle</option>
							<option value='Culture'>Culture</option>
						</select>
						{errors.category && <p className='mt-1 text-xs text-red-500'>{errors.category.message}</p>}
					</div>

					<div className='flex items-center'>
						<Input
							type='checkbox'
							id='featured'
							{...register('featured')}
							className='h-4 w-4 text-primary focus:ring-primary border-gray-300 cursor-pointer'
						/>
						<Label
							htmlFor='featured'
							className='ml-2 block text-sm text-gray-700'>
							Article mis en avant
						</Label>
					</div>
				</div>

				<div className='flex justify-between'>
					{hasErrored && <p className='text-red-500'>{result.serverError}</p>}
					<Button
						type='submit'
						className='ml-auto w-36 h-12'
						disabled={isExecuting || !isDirty || !isValid}>
						{isExecuting ? (
							<>
								<Loader2 className='animate-spin mr-2 h-4 w-4' />
							</>
						) : (
							'Sauvegarder'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
