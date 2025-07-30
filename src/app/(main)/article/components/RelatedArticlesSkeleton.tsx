export default function RelatedArticlesSkeleton() {
	return (
		<div className='bg-gray-50 py-16'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='h-10 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-12'></div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{[...Array(3)].map((_, index) => (
						<div key={index} className='group'>
							<div className='relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-200 animate-pulse'></div>
							<div className='h-4 w-16 bg-gray-200 animate-pulse rounded mb-2'></div>
							<div className='h-6 w-full bg-gray-200 animate-pulse rounded mb-1'></div>
							<div className='h-6 w-3/4 bg-gray-200 animate-pulse rounded'></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}