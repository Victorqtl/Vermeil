export default function UserProfileSkeleton() {
	return (
		<>
			<div className='relative flex border-b border-gray-200'>
				<div className='px-6 py-4 w-20 h-12 bg-gray-200 animate-pulse rounded-t' />
				<div className='px-6 py-4 w-32 h-12 bg-gray-100 animate-pulse rounded-t ml-2' />
			</div>

			<div className='flex flex-col justify-center gap-6 h-[300px]'>
				<div className='space-y-6'>
					<div>
						<div className='w-24 h-4 bg-gray-200 animate-pulse rounded mb-2' />
						<div className='w-full h-10 bg-gray-100 animate-pulse rounded' />
					</div>

					<div>
						<div className='w-16 h-4 bg-gray-200 animate-pulse rounded mb-2' />
						<div className='w-full h-10 bg-gray-100 animate-pulse rounded' />
					</div>

					<div className='flex items-center justify-between w-full pt-4'>
						<div className='w-36 h-12 bg-gray-200 animate-pulse rounded ml-auto' />
					</div>
				</div>
			</div>
		</>
	);
}
