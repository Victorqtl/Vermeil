'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '../actions/updateProfile.action';
import { useAction } from 'next-safe-action/hooks';
import { Loader2 } from 'lucide-react';
import SavedArticles from './SavedArticles';
import { Article } from '@/types/article';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
	initialSavedArticles: Article[];
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
}

export const formSchema = z.object({
	name: z
		.string()
		.min(1, 'Le nom est requis')
		.max(30, 'Le nom ne doit pas dépasser 30 caractères')
		.regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
	email: z.string().email('Adresse e-mail invalide'),
});

type FormValues = z.infer<typeof formSchema>;

export default function UserProfile({ initialSavedArticles, user }: UserProfileProps) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(updateProfile);

	const [activeTab, setActiveTab] = useState('profile');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async data => {
		await executeAsync(data);
	};

	return (
		<>
			<div className='relative flex border-b border-gray-200'>
				<button
					onClick={() => setActiveTab('profile')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500 hover:text-gray-900 ${
						activeTab === 'profile' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Profil
				</button>
				<button
					onClick={() => setActiveTab('saved-articles')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500 hover:text-gray-900 ${
						activeTab === 'saved-articles' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Articles Sauvegardés
				</button>
			</div>
			{activeTab === 'profile' && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-6'>
					<div>
						<Label htmlFor='name'>Nom complet</Label>
						<Input
							id='name'
							type='text'
							{...register('name')}
							aria-invalid={!!errors.name}
						/>
						{errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
					</div>
					<div>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							{...register('email')}
							aria-invalid={!!errors.email}
						/>
						{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
					</div>
					<div className='flex items-center justify-between w-full'>
						{hasErrored && <p className='text-red-500'>{result.serverError}</p>}
						<Button
							type='submit'
							className='ml-auto w-36 h-12'
							disabled={isExecuting}>
							{isExecuting ? <Loader2 className='animate-spin' /> : 'Sauvegarder'}
						</Button>
					</div>
				</form>
			)}
			{activeTab === 'saved-articles' && (
				<>
					<SavedArticles initialData={initialSavedArticles} />
				</>
			)}
		</>
	);
}
