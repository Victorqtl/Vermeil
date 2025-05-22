'use client';

import { signUp } from '@/lib/auth-client';
import Image from 'next/image';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z
	.object({
		firstName: z.string().min(1, 'Le prénom est requis'),
		lastName: z.string().min(1, 'Le nom est requis'),
		email: z.string().email('Adresse e-mail invalide'),
		password: z
			.string()
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
			.refine(value => /[A-Z]/.test(value), {
				message: 'Le mot de passe doit contenir au moins une majuscule',
			})
			.refine(value => /[^a-zA-Z0-9]/.test(value), {
				message: 'Le mot de passe doit contenir au moins un caractère spécial',
			}),
		passwordConfirmation: z.string().min(8, 'La confirmation du mot de passe doit contenir au moins 8 caractères'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirmation'],
	});

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUpPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormValues>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<SignUpFormValues> = async data => {
		setApiError('');
		await signUp.email({
			email: data.email,
			password: data.password,
			name: `${data.firstName} ${data.lastName}`,
			callbackURL: '/account/profile',
			fetchOptions: {
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: ctx => {
					if (ctx.error.status === 422) {
						setApiError("L'email existe déjà.");
					} else {
						setApiError(ctx.error.message);
					}
					setLoading(false);
				},
				onSuccess: async () => {
					router.push('/account/profile');
				},
			},
		});
	};

	return (
		<div className='flex flex-col-reverse lg:flex-row lg:min-h-screen'>
			<div>
				<Link
					href='/'
					className='absolute lg:top-0 lg:left-0 lg:translate-x-0 lg:p-8 top-9 left-1/2 -translate-x-1/2 font-bold text-2xl md:text-3xl text-gray-900 font-serif'>
					VERMEIL
				</Link>
			</div>
			<div className='flex lg:basis-3/5 justify-center items-center'>
				<div className='mt-10 lg:mt-0 px-10 sm:p-0 w-full max-w-md space-y-8'>
					<div className='text-center'>
						<h1 className='text-2xl text-gray-900 font-sans font-medium md:text-4xl'>Créez votre compte</h1>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-6'>
						<div className='flex space-x-4'>
							<div className='flex-1'>
								<label
									htmlFor='firstName'
									className='block text-sm font-medium text-gray-700'>
									Prénom
								</label>
								<input
									id='firstName'
									type='text'
									{...register('firstName')}
									className={`mt-1 block w-full p-3 border-b ${
										errors.firstName ? 'focus:border-red-500 border-red-500' : 'border-gray-300'
									} focus:outline-none focus:border-gray-900 sm:text-sm`}
								/>
								{errors.firstName && (
									<p className='mt-2 text-sm text-red-600'>{errors.firstName.message}</p>
								)}
							</div>
							<div className='flex-1'>
								<label
									htmlFor='lastName'
									className='block text-sm font-medium text-gray-700'>
									Nom
								</label>
								<input
									id='lastName'
									type='text'
									{...register('lastName')}
									className={`mt-1 block w-full p-3 border-b ${
										errors.lastName ? 'focus:border-red-500 border-red-500' : 'border-gray-300'
									} focus:outline-none focus:border-gray-900 sm:text-sm`}
								/>
								{errors.lastName && (
									<p className='mt-2 text-sm text-red-600'>{errors.lastName.message}</p>
								)}
							</div>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'>
								Adresse email
							</label>
							<input
								id='email'
								type='email'
								{...register('email')}
								className={`mt-1 block w-full p-3 border-b ${
									errors.email ? 'focus:border-red-500 border-red-500' : 'border-gray-300'
								} focus:outline-none focus:border-gray-900 sm:text-sm`}
							/>
							{errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'>
								Mot de passe
							</label>
							<input
								id='password'
								type='password'
								{...register('password')}
								autoComplete='new-password'
								className={`mt-1 block w-full p-3 border-b ${
									errors.password ? 'focus:border-red-500 border-red-500' : 'border-gray-300'
								} focus:outline-none focus:border-gray-900 sm:text-sm`}
							/>
							{errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
						</div>
						<div>
							<label
								htmlFor='passwordConfirmation'
								className='block text-sm font-medium text-gray-700'>
								Confirmer le mot de passe
							</label>
							<input
								id='passwordConfirmation'
								type='password'
								{...register('passwordConfirmation')}
								autoComplete='new-password'
								className={`mt-1 block w-full p-3 border-b ${
									errors.passwordConfirmation
										? 'focus:border-red-500 border-red-500'
										: 'border-gray-300'
								} focus:outline-none focus:border-gray-900 sm:text-sm`}
							/>
							{errors.passwordConfirmation && (
								<p className='mt-2 text-sm text-red-600'>{errors.passwordConfirmation.message}</p>
							)}
						</div>
						{apiError && <p className='text-sm text-red-600'>{apiError}</p>}
						<div>
							<Button
								type='submit'
								variant='auth'
								size='xl'
								disabled={loading}>
								{loading ? (
									<Loader2
										color='white'
										size={20}
										className='animate-spin'
									/>
								) : (
									<>
										S&apos;inscrire
										<ArrowRight
											size={18}
											className=' transition-transform duration-200 group-hover:translate-x-1'
										/>
									</>
								)}
							</Button>
						</div>
						<p className='mt-8 text-center text-gray-600'>
							Vous avez déjà un compte ?{' '}
							<Link
								href='/auth/sign-in'
								className='font-bold text-gray-700 hover:text-gray-900 hover:underline'>
								Se connecter
							</Link>
						</p>
					</form>
				</div>
			</div>
			<div className='h-[150px] md:h-[250px] lg:h-screen mt-25 lg:mt-0 lg:basis-2/5'>
				<Image
					src='https://images.unsplash.com/photo-1724627561744-6350067436ea?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='Man'
					width={2000}
					height={3000}
					className='w-full h-full object-cover object-[center_35%]'
					priority={true}
				/>
			</div>
		</div>
	);
}
