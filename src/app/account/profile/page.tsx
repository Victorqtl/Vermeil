import { getUser } from '@/lib/auth-session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function page() {
	const user = await getUser();
	return (
		<div>
			<div>
				<h1>Mon compte</h1>
				<p>Vous êtes connecté en tant que {user?.email}</p>
				<form>
					<button
						formAction={async () => {
							'use server';
							await auth.api.signOut({
								headers: await headers(),
							});
							redirect('/auth/sign-in');
						}}>
						Déconnexion
					</button>
				</form>
			</div>
		</div>
	);
}
