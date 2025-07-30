export default function SaveArticleSkeleton() {
	return (
		<div className='w-full flex justify-center items-center mb-16'>
			<div className='flex items-center p-4 bg-white border border-gray-300 xl:fixed xl:z-10 xl:left-8 xl:w-[58px]'>
				<div className='w-6 h-6 bg-gray-200 animate-pulse rounded' />
				<div className='ml-2 w-20 h-4 bg-gray-200 animate-pulse rounded xl:hidden' />
			</div>
		</div>
	);
}