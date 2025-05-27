import { getUser } from '@/lib/auth-session';
import { getUserSavedArticles } from '@/lib/data-access/articles';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import UserProfile from './components/UserProfile';

export default async function page() {
	const user = await getUser();
	const savedArticles = user ? await getUserSavedArticles(user.id) : [];

	return (
		<div className='relative w-full h-fit max-w-4xl mt-18 p-8 bg-white border border-gray-100 shadow-sm'>
			<form className='absolute top-4 right-4'>
				<button
					formAction={async () => {
						'use server';
						await auth.api.signOut({
							headers: await headers(),
						});
						redirect('/auth/sign-in');
					}}
					className='flex items-center gap-2 cursor-pointer text-gray-900 hover:opacity-70'>
					<LogOut size={18} />
					Déconnexion
				</button>
			</form>
			<div className='flex flex-col gap-4'>
				<UserProfile
					initialSavedArticles={savedArticles}
					user={user}
				/>
			</div>
		</div>
	);
}
