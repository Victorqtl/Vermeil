'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateProfileSchema, UserProfileFormValues } from '@/lib/schemas/updateProfile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from '../actions/updateProfile.action';
import { useAction } from 'next-safe-action/hooks';
import { Loader2 } from 'lucide-react';
import SavedArticles from './SavedArticles';
import { Article } from '@/types/article';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserProfileProps {
	initialSavedArticles: Article[];
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
}

export default function UserProfile({ initialSavedArticles, user }: UserProfileProps) {
	const { executeAsync, hasErrored, result, isExecuting } = useAction(updateProfile);

	const [activeTab, setActiveTab] = useState('profile');

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<UserProfileFormValues>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
		},
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<UserProfileFormValues> = async data => {
		try {
			await executeAsync(data);
		} catch (error) {
			console.error('Erreur lors de la soumission:', error);
		}
	};

	return (
		<>
			<div className='relative flex border-b border-gray-200'>
				<button
					onClick={() => setActiveTab('profile')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500 hover:text-gray-900 transition-colors ${
						activeTab === 'profile' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Profil
				</button>
				<button
					onClick={() => setActiveTab('saved-articles')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500 hover:text-gray-900 transition-colors ${
						activeTab === 'saved-articles' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Articles Sauvegardés
				</button>
			</div>

			{activeTab === 'profile' && (
				<div className='space-y-6'>
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
								className={errors.name && 'border-red-500 focus:border-red-500'}
							/>
							{errors.name && (
								<p
									className='text-red-500 text-sm mt-1'
									role='alert'>
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
								aria-invalid={!!errors.email}
								className={errors.email && 'border-red-500 focus:border-red-500'}
							/>
							{errors.email && (
								<p
									className='text-red-500 text-sm mt-1'
									role='alert'>
									{errors.email.message}
								</p>
							)}
						</div>

						<div className='inline-flex flex-col gap-1'>
							<Label htmlFor='password'>Mot de passe</Label>
							<Link
								href='/auth/forget-password'
								className='text-sm font-medium underline'>
								Changer de mot de passe
							</Link>
						</div>

						<div className='flex items-center justify-between w-full pt-4'>
							{hasErrored && <p className='text-red-500 text-sm'>{result.serverError}</p>}

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
			)}

			{activeTab === 'saved-articles' && <SavedArticles initialData={initialSavedArticles} />}
		</>
	);
}
