// 'use client';

// import { authClient } from '@/lib/auth-client';
// import { useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';

// export default function ForgetPassword() {
// 	const searchParams = useSearchParams();
// 	const token = searchParams.get('token');
// 	const router = useRouter();

// 	if (!token) {
// 		return (
// 			<div>
// 				<h1>Réinitialiser le mot de passe</h1>
// 				<p>Entrez votre adresse mail, nous vous enverrons un lien pour réinitialiser votre mot de passe</p>
// 				<form
// 					action={async formData => {
// 						'use server';
// 						const email = formData.get('email');
// 						await authClient.forgetPassword({
// 							email: email as string,
// 							redirectTo: '/auth/forget-password',
// 						});
// 					}}>
// 					<input
// 						id='email'
// 						name='email'
// 						type='email'
// 						autoComplete='email'
// 						required
// 						placeholder='Email'
// 					/>
// 					<button type='submit'>Envoyer le lien de réinitialisation</button>
// 				</form>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div>
// 			<h1>Réinitialiser le mot de passe</h1>
// 			<p>Entrez votre adresse mail, nous vous enverrons un lien pour réinitialiser votre mot de passe</p>
// 			<form
// 				action={async formData => {
// 					'use server';
// 					const password = formData.get('password');
// 					await authClient.resetPassword(
// 						{
// 							newPassword: password as string,
// 							token: token as string,
// 						},
// 						{
// 							onError: ctx => {
// 								console.error(ctx.error.message);
// 							},
// 							onSuccess: () => {
// 								router.push('/auth/signin');
// 							},
// 						}
// 					);
// 				}}>
// 				<input
// 					id='password'
// 					name='password'
// 					type='password'
// 					autoComplete='password'
// 					required
// 					placeholder='Mot de passe'
// 				/>
// 				<button type='submit'>Réinitialiser le mot de passe</button>
// 			</form>
// 		</div>
// 	);
// }
