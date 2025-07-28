export default function CommentsSkeleton() {
	return (
		<div className='bg-gray-50 py-16'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='max-w-3xl mx-auto'>
					<div className='animate-pulse'>
						<div className='h-8 bg-gray-200 rounded mb-8 w-48'></div>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='mb-6 p-4 bg-white rounded-lg'>
								<div className='flex items-center mb-3'>
									<div className='w-10 h-10 bg-gray-200 rounded-full mr-3'></div>
									<div className='h-4 bg-gray-200 rounded w-24'></div>
								</div>
								<div className='space-y-2'>
									<div className='h-4 bg-gray-200 rounded w-full'></div>
									<div className='h-4 bg-gray-200 rounded w-3/4'></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}