'use client';

import { signUp } from '@/lib/auth-client';
import Image from 'next/image';
import { LoaderCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z
	.object({
		firstName: z
			.string()
			.min(1, 'Le prénom est requis')
			.max(30, 'Le prénom ne peut pas dépasser 30 caractères')
			.regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom contient des caractères non autorisés')
			.transform(value => value.trim())
			.refine(value => value.length > 0, 'Le prénom ne peut pas être vide'),
		lastName: z
			.string()
			.min(1, 'Le nom est requis')
			.max(30, 'Le nom ne peut pas dépasser 30 caractères')
			.regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères non autorisés')
			.transform(value => value.trim())
			.refine(value => value.length > 0, 'Le nom ne peut pas être vide'),
		email: z
			.string()
			.min(1, "L'adresse e-mail est requise")
			.max(254, "L'adresse e-mail est trop longue")
			.email('Adresse e-mail invalide')
			.transform(value => value.toLowerCase().trim()),
		password: z
			.string()
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
			.max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
			.refine(value => /[A-Z]/.test(value), {
				message: 'Le mot de passe doit contenir au moins une majuscule',
			})
			.refine(value => /[a-z]/.test(value), {
				message: 'Le mot de passe doit contenir au moins une minuscule',
			})
			.refine(value => /[0-9]/.test(value), {
				message: 'Le mot de passe doit contenir au moins un chiffre',
			})
			.refine(value => /[^a-zA-Z0-9]/.test(value), {
				message: 'Le mot de passe doit contenir au moins un caractère spécial',
			}),
		passwordConfirmation: z.string().min(1, 'La confirmation du mot de passe est requise'),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['passwordConfirmation'],
	});

type SignUpFormValues = z.infer<typeof formSchema>;

function SignUpPage() {
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
				onRequest: () => {
					setLoading(true);
				},
				onError: ctx => {
					if (ctx.error.status === 422) {
						setApiError("L'email existe déjà.");
					} else {
						setApiError(ctx.error.message || "Une erreur s'est produite. Veuillez réessayer.");
					}
					setLoading(false);
				},
				onSuccess: async () => {
					router.push('/account/profile');
					setLoading(false);
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
								<Label htmlFor='firstName'>Prénom</Label>
								<Input
									id='firstName'
									type='text'
									{...register('firstName')}
									aria-invalid={!!errors.firstName}
								/>
								{errors.firstName && (
									<p className='mt-2 text-sm text-red-600'>{errors.firstName.message}</p>
								)}
							</div>
							<div className='flex-1'>
								<Label htmlFor='lastName'>Nom</Label>
								<Input
									id='lastName'
									type='text'
									{...register('lastName')}
									aria-invalid={!!errors.lastName}
								/>
								{errors.lastName && (
									<p className='mt-2 text-sm text-red-600'>{errors.lastName.message}</p>
								)}
							</div>
						</div>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
								autoComplete='email'
								aria-invalid={!!errors.email}
							/>
							{errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
						</div>
						<div>
							<Label htmlFor='password'>Mot de passe</Label>
							<Input
								id='password'
								type='password'
								{...register('password')}
								autoComplete='new-password'
								aria-invalid={!!errors.password}
							/>
							{errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password.message}</p>}
						</div>
						<div>
							<Label htmlFor='passwordConfirmation'>Confirmer le mot de passe</Label>
							<Input
								id='passwordConfirmation'
								type='password'
								{...register('passwordConfirmation')}
								autoComplete='new-password'
								aria-invalid={!!errors.passwordConfirmation}
							/>
							{errors.passwordConfirmation && (
								<p className='mt-2 text-sm text-red-600'>{errors.passwordConfirmation.message}</p>
							)}
						</div>
						{apiError && <p className='text-sm text-red-600'>{apiError}</p>}
						<div>
							<Button
								type='submit'
								size='xl'
								className='w-full'
								disabled={loading}>
								{loading ? (
									<LoaderCircle
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

export default SignUpPage;
