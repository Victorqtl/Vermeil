'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { updateArticle } from '../actions/updateArticle.action';
import { deleteArticle } from '../actions/deleteArticle.action';
import { updateArticleSchema, type UpdateArticleFormValues } from '@/lib/schemas/article.schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditArticleSection from './EditArticleSection';

interface EditArticlePageProps {
	initialData: {
		id: string;
		title: string;
		slug: string;
		excerpt: string;
		description: string;
		heroImage: string;
		readTime: number;
		featured: boolean;
		category: string;
		sections: Array<{
			name: string;
			description: string;
			image: string;
			link: string | null;
		}>;
	};
}

export default function EditArticlePage({ initialData }: EditArticlePageProps) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(updateArticle);
	const {
		executeAsync: executeDeleteAsync,
		hasErrored: hasDeleteErrored,
		result: deleteResult,
		isExecuting: isDeleting,
	} = useAction(deleteArticle);

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors, isDirty, isValid },
	} = useForm<UpdateArticleFormValues>({
		resolver: zodResolver(updateArticleSchema),
		defaultValues: {
			id: initialData.id,
			title: initialData.title,
			slug: initialData.slug,
			excerpt: initialData.excerpt,
			description: initialData.description,
			heroImage: initialData.heroImage,
			readTime: initialData.readTime,
			featured: initialData.featured,
			category: initialData.category,
			sections: initialData.sections.map(section => ({
				name: section.name,
				description: section.description,
				image: section.image,
				link: section.link || '',
			})),
		},
		mode: 'onChange',
	});

	const generateSlug = (title: string): string => {
		return title
			.toLowerCase()
			.trim()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-')
			.replace(/^-+/, '')
			.replace(/-+$/, '');
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		const newSlug = generateSlug(title);
		setValue('slug', newSlug, { shouldValidate: true });
	};

	const onSubmit: SubmitHandler<UpdateArticleFormValues> = async data => {
		try {
			await executeAsync(data);
		} catch (error) {
			console.error('Erreur lors de la soumission:', error);
		}
	};

	const handleDeleteArticle = async () => {
		const isConfirmed = window.confirm(
			'Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.'
		);

		if (isConfirmed) {
			try {
				await executeDeleteAsync({ id: initialData.id });
			} catch (error) {
				console.error('Erreur lors de la suppression:', error);
			}
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-4xl font-bold'>Modifier l'article</h1>
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
				<input
					type='hidden'
					{...register('id')}
				/>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-bold'>Informations de base</h2>
					<div className='flex items-center gap-4'>
						<Button
							type='button'
							onClick={handleDeleteArticle}
							disabled={isDeleting || isExecuting}
							className='flex items-center'>
							{isDeleting ? (
								<>
									<Loader2 className='animate-spin' />
								</>
							) : (
								<>
									<Trash2 />
								</>
							)}
						</Button>
					</div>
				</div>
				<div>
					<Label htmlFor='title'>Titre *</Label>
					<Input
						type='text'
						id='title'
						{...register('title', {
							onChange: handleTitleChange,
						})}
						aria-invalid={!!errors.title}
					/>
					{errors.title && <p className='mt-1 text-xs text-red-500'>{errors.title.message}</p>}
				</div>

				<div className='flex flex-col sm:flex-row justify-between gap-6'>
					<div className='w-full'>
						<Label htmlFor='slug'>Slug *</Label>
						<Input
							type='text'
							id='slug'
							{...register('slug')}
							aria-invalid={!!errors.slug}
						/>
						<p className='mt-1 text-xs text-gray-500'>URL de l'article (auto-généré à partir du titre)</p>
						{errors.slug && <p className='mt-1 text-xs text-red-500'>{errors.slug.message}</p>}
					</div>
					<div className='w-full'>
						<Label htmlFor='readTime'>Temps de lecture (minutes) *</Label>
						<Input
							type='number'
							id='readTime'
							{...register('readTime')}
							min='1'
							aria-invalid={!!errors.readTime}
						/>
						{errors.readTime && <p className='mt-1 text-xs text-red-500'>{errors.readTime.message}</p>}
					</div>
				</div>

				<div>
					<Label htmlFor='excerpt'>Extrait *</Label>
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

				<div>
					<Label htmlFor='description'>Description *</Label>
					<textarea
						id='description'
						{...register('description')}
						rows={6}
						className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent ${
							errors.description && 'border-red-500 focus:ring-red-500'
						}`}
					/>
					{errors.description && <p className='mt-1 text-xs text-red-500'>{errors.description.message}</p>}
				</div>

				<div>
					<Label htmlFor='heroImage'>URL de l'image *</Label>
					<Input
						type='url'
						id='heroImage'
						{...register('heroImage')}
						aria-invalid={!!errors.heroImage}
					/>
					<p className='mt-1 text-xs text-gray-500'>URL de l'image principale de l'article</p>
					{errors.heroImage && <p className='mt-1 text-xs text-red-500'>{errors.heroImage.message}</p>}
				</div>

				<div className='flex flex-col sm:flex-row justify-between gap-6'>
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

				<div className='h-px w-11/12 mt-10 mx-auto bg-gray-200'></div>

				<EditArticleSection
					register={register}
					errors={errors}
					control={control}
				/>

				<div className='flex items-center justify-between'>
					{hasErrored && <p className='text-red-500'>{result.serverError}</p>}
					{hasDeleteErrored && <p className='text-red-500'>{deleteResult.serverError}</p>}
					<Button
						type='submit'
						className='ml-auto w-36 h-12'
						disabled={isExecuting || !isDirty || !isValid}>
						{isExecuting ? (
							<>
								<Loader2 className='animate-spin mr-2 h-4 w-4' />
							</>
						) : (
							'Mettre à jour'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
