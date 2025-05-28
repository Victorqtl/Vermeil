import { getUser } from '@/lib/auth-session';
import { getUserSavedArticles } from '@/lib/data-access/articles';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import UserProfile from './components/UserProfile';
import { UserAvatarUploader } from './components/ui/user-avatar-uploader';

export default async function page() {
	const user = await getUser();
	const savedArticles = await getUserSavedArticles(user!.id);

	return (
		<div className='flex flex-col relative w-full h-fit max-w-4xl lg:mt-18 shadow-sm'>
			<div className='relative bg-gray-100 h-48'>
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
				<div className='absolute -bottom-16 left-8'>
					<UserAvatarUploader user={user!} />
				</div>
			</div>
			<div className='p-8 pt-20 bg-white'>
				<div className='flex flex-col gap-4'>
					<UserProfile
						initialSavedArticles={savedArticles}
						user={user!}
					/>
				</div>
			</div>
		</div>
	);
}
