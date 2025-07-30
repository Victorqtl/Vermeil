import UserProfileWrapper from '@/app/profile/components/UserProfileWrapper';
import UserAvatarUploaderWrapper from '@/app/profile/components/UserAvatarUploaderWrapper';
import UserProfileSkeleton from '@/app/profile/components/ui/UserProfileSkeleton';
import UserAvatarUploaderSkeleton from '@/app/profile/components/ui/UserAvatarUploaderSkeleton';
import SignOutButton from '@/app/profile/components/SignOutButton';
import { Suspense } from 'react';

export default async function page() {
	return (
		<div className='flex flex-col relative w-full h-fit max-w-4xl lg:mt-18 shadow-sm'>
			<div className='relative bg-gray-100 h-48'>
				<div className='absolute top-4 right-4'>
					<SignOutButton />
				</div>
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
