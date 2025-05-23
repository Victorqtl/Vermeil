import { getUser } from '@/lib/auth-session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function page() {
	const user = await getUser();
	return (
		<div className='flex justify-center mt-14'>
			<div className='flex flex-col gap-4 w-full max-w-sm'>
				<h1 className='text-3xl font-bold'>Mon compte</h1>
				<p>
					Bonjour <span className='font-bold'>{user?.name}</span>
				</p>
				<p>
					Votre adresse email est <span className='font-bold'>{user?.email}</span>
				</p>
				<form>
					<Button
						variant='auth'
						size='xl'
						formAction={async () => {
							'use server';
							await auth.api.signOut({
								headers: await headers(),
							});
							redirect('/auth/sign-in');
						}}>
						Déconnexion
					</Button>
				</form>
			</div>
		</div>
	);
}
