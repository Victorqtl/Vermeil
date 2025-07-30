import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import UserProfileWrapper from '@/app/profile/components/UserProfileWrapper';
import UserAvatarUploaderWrapper from '@/app/profile/components/UserAvatarUploaderWrapper';
import UserProfileSkeleton from '@/app/profile/components/ui/UserProfileSkeleton';
import UserAvatarUploaderSkeleton from '@/app/profile/components/ui/UserAvatarUploaderSkeleton';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

export default async function page() {
	return (
		<div className='flex flex-col relative w-full h-fit max-w-4xl lg:mt-18 shadow-sm'>
			<div className='relative bg-gray-100 h-48'>
				<form className='absolute top-4 right-4'>
					<Button
						formAction={async () => {
							'use server';
							await auth.api.signOut({
								headers: await headers(),
							});
							redirect('/auth/sign-in');
						}}
						variant='outlined'>
						<LogOut
							className='group'
							size={18}
						/>
						Déconnexion
					</Button>
				</form>
				<div className='absolute -bottom-22 left-8'>
					<Suspense fallback={<UserAvatarUploaderSkeleton />}>
						<UserAvatarUploaderWrapper />
					</Suspense>
				</div>
			</div>
			<div className='p-8 pt-20 bg-white'>
				<div className='flex flex-col gap-4'>
					<Suspense fallback={<UserProfileSkeleton />}>
						<UserProfileWrapper />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
