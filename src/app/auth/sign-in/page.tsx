'use client';

import { signIn } from '@/lib/auth-client';
import Image from 'next/image';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signInSchema = z.object({
	email: z.string().email({ message: 'Adresse e-mail invalide' }),
	password: z.string().min(1, { message: 'Le mot de passe est requis' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
	const [loading, setLoading] = useState(false);
	const [loadingGoogle, setLoadingGoogle] = useState(false);
	const [apiError, setApiError] = useState('');
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormValues>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit: SubmitHandler<SignInFormValues> = async data => {
		setApiError('');
		await signIn.email(
			{
				email: data.email,
				password: data.password,
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onError: () => {
					setApiError('Email ou mot de passe incorrect');
					setLoading(false);
				},
				onResponse: () => {
					setLoading(false);
				},
				onSuccess: () => {
					router.push('/account/profile');
				},
			}
		);
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
				<div className='mt-10 lg:mt-0 px-10 sm:p-0 w-full max-w-md space-y-8 bg-white'>
					<div className='text-center'>
						<h1 className='text-2xl text-gray-900 font-sans font-medium md:text-4xl'>Connectez-vous</h1>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-6'>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								variant='underline'
								{...register('email')}
								autoComplete='email'
								aria-invalid={!!(errors.email || apiError)}
							/>
							{errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
						</div>
						<div>
							<Label htmlFor='password'>Mot de passe</Label>
							<Input
								id='password'
								type='password'
								variant='underline'
								{...register('password')}
								autoComplete='current-password'
								aria-invalid={!!(errors.password || apiError)}
							/>

							{errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
						</div>
						<div className='flex flex-col gap-2'>
							{apiError && <p className='text-sm text-red-600'>{apiError}</p>}
							<Link
								href='/auth/forget-password'
								className='block text-sm text-gray-700 hover:text-gray-900'>
								Mot de passe oublié ?
							</Link>
						</div>
						<div>
							<Button
								type='submit'
								size='xl'
								className='w-full'
								disabled={loading}>
								{loading ? (
									<Loader2
										color='white'
										size={20}
										className='animate-spin'
									/>
								) : (
									<>
										Se connecter
										<ArrowRight
											size={18}
											className=' transition-transform duration-200 group-hover:translate-x-1'
										/>
									</>
								)}
							</Button>
						</div>
						<div className='relative my-6'>
							<div
								className='absolute inset-0 flex items-center'
								aria-hidden='true'>
								<div className='w-full border-t border-gray-300' />
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-gray-500'>ou</span>
							</div>
						</div>
						<div>
							<Button
								type='button'
								onClick={async () => {
									setApiError('');
									await signIn.social(
										{
											provider: 'google',
											callbackURL: '/account/profile',
										},
										{
											onRequest: () => {
												setLoadingGoogle(true);
											},
											onResponse: () => {
												setLoadingGoogle(false);
											},
											onError: () => {
												setApiError("Une erreur s'est produite. Veuillez réessayer.");
												setLoadingGoogle(false);
											},
										}
									);
								}}
								disabled={loadingGoogle}
								variant='outlined'
								className='w-full'
								size='xl'>
								{loadingGoogle ? (
									<Loader2
										color='black'
										size={20}
										className='animate-spin'
									/>
								) : (
									<>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='currentColor'
											className='text-gray-900'
											aria-hidden='true'>
											<path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
											<path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
											<path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
											<path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
										</svg>
										Se connecter avec Google
									</>
								)}
							</Button>
						</div>
						<p className='mt-8 text-center text-gray-600'>
							Vous n&apos;avez pas de compte ?{' '}
							<Link
								href='/auth/sign-up'
								className='font-bold text-gray-700 hover:text-gray-900 hover:underline'>
								S&apos;inscrire
							</Link>
						</p>
					</form>
				</div>
			</div>
			<div className='h-[150px] md:h-[250px] lg:h-screen mt-25 lg:mt-0 lg:basis-2/5'>
				<Image
					src='https://images.unsplash.com/photo-1724627561744-6350067436ea?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='Man'
					width={2000} // Intrinsic width, adjust to match source aspect ratio
					height={3000} // Intrinsic height, adjust to match source aspect ratio (approx 2:3 for this image)
					className='w-full h-full object-cover object-[center_35%]'
					priority={true} // Prioritize loading for LCP
				/>
			</div>
		</div>
	);
}
