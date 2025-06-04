import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors, UseFormRegister, useFieldArray, Control } from 'react-hook-form';
import { ArticleFormValues } from '@/lib/schemas/article.schema';
import { X } from 'lucide-react';

export default function AddArticleSection({
	register,
	errors,
	control,
}: {
	register: UseFormRegister<ArticleFormValues>;
	errors: FieldErrors<ArticleFormValues>;
	control: Control<ArticleFormValues>;
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'sections',
	});
	return (
		<div className='flex flex-col gap-6'>
			<h2 className='text-2xl font-bold'>Sections</h2>
			{fields.map((field, index) => (
				<div
					className='space-y-6 relative'
					key={field.id}>
					<h3 className='text-2xl font-bold'>{index + 1}.</h3>
					<button
						type='button'
						onClick={() => {
							remove(index);
						}}
						className='absolute top-1 right-0 p-1 border border-gray-200 hover:bg-gray-100 cursor-pointer'>
						<X
							size={16}
							className='text-gray-900'
						/>
					</button>
					<div>
						<Label htmlFor={`sections.${index}.name`}>Nom de la section *</Label>
						<Input
							type='text'
							id={`sections.${index}.name`}
							{...register(`sections.${index}.name`)}
							aria-invalid={!!errors.sections?.[index]?.name}
						/>
						{errors.sections?.[index]?.name && (
							<p className='mt-1 text-xs text-red-500'>{errors.sections?.[index]?.name.message}</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<Label htmlFor={`sections.${index}.description`}>Description de la section *</Label>
						<textarea
							id={`sections.${index}.description`}
							rows={5}
							{...register(`sections.${index}.description`)}
							className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent ${
								errors.sections?.[index]?.description && 'border-red-500 focus:ring-red-500'
							}`}
						/>
						{errors.sections?.[index]?.description && (
							<p className='mt-1 text-xs text-red-500'>{errors.sections?.[index]?.description.message}</p>
						)}
					</div>
					<div>
						<Label htmlFor={`sections.${index}.image`}>URL de l'image *</Label>
						<Input
							type='url'
							id={`sections.${index}.image`}
							{...register(`sections.${index}.image`)}
							aria-invalid={!!errors.sections?.[index]?.image}
						/>
						{errors.sections?.[index]?.image && (
							<p className='mt-1 text-xs text-red-500'>{errors.sections?.[index]?.image.message}</p>
						)}
					</div>
					<div>
						<Label htmlFor={`sections.${index}.link`}>URL du produit</Label>
						<Input
							type='url'
							id={`sections.${index}.link`}
							{...register(`sections.${index}.link`)}
							aria-invalid={!!errors.sections?.[index]?.link}
						/>
						{errors.sections?.[index]?.link && (
							<p className='mt-1 text-xs text-red-500'>{errors.sections?.[index]?.link.message}</p>
						)}
					</div>
				</div>
			))}
			<div className='flex flex-col items-center gap-2'>
				<h2 className=' font-sans'>Ajouter une section</h2>
				<button
					type='button'
					className='w-12 h-12 border border-gray-200 cursor-pointer hover:bg-gray-100 flex items-center justify-center'
					onClick={() => {
						append({ name: '', description: '', image: '', link: '' });
					}}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						className='text-gray-900'>
						<path
							d='M12 5v14M5 12h14'
							stroke='currentColor'
							strokeWidth='2'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
