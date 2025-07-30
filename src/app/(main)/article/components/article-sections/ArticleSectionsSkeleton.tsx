export default function ArticleSectionsSkeleton() {
	return (
		<div className='max-w-3xl mx-auto'>
			{/* Article description skeleton */}
			<div className='text-gray-900 text-lg leading-relaxed mb-6'>
				<div className='animate-pulse space-y-3'>
					<div className='h-4 bg-gray-200 rounded w-full'></div>
					<div className='h-4 bg-gray-200 rounded w-11/12'></div>
					<div className='h-4 bg-gray-200 rounded w-4/5'></div>
				</div>
			</div>
			
			{/* Sections skeleton */}
			{[1, 2, 3].map(i => (
				<div key={i} className='mt-16'>
					{/* Section title */}
					<div className='animate-pulse mb-4'>
						<div className='h-8 bg-gray-200 rounded w-3/4'></div>
					</div>
					
					{/* Section description */}
					<div className='animate-pulse space-y-2 mb-6'>
						<div className='h-4 bg-gray-200 rounded w-full'></div>
						<div className='h-4 bg-gray-200 rounded w-5/6'></div>
						<div className='h-4 bg-gray-200 rounded w-3/4'></div>
					</div>
					
					{/* Section image */}
					<div className='animate-pulse mb-6'>
						<div className='aspect-[16/9] bg-gray-200 rounded'></div>
					</div>
					
					{/* Section button */}
					<div className='animate-pulse'>
						<div className='h-12 bg-gray-200 rounded w-32'></div>
					</div>
				</div>
			))}
		</div>
	);
}