export default function UserAvatarUploaderSkeleton() {
	return (
		<div className='flex flex-col'>
			<div className='relative flex flex-col items-center w-32 h-32 rounded-full border-3 border-white bg-white shadow-lg'>
				<div className='relative inline-flex size-full'>
					<div className='relative flex size-full items-center justify-center overflow-hidden rounded-full bg-gray-200 animate-pulse'>
						<div className='w-16 h-16 bg-gray-300 rounded-full animate-pulse' />
					</div>
				</div>
			</div>
			<div className='min-h-[1.5rem] mt-2 px-2'>
				<div className='w-20 h-4 bg-white animate-pulse rounded' />
			</div>
		</div>
	);
}
