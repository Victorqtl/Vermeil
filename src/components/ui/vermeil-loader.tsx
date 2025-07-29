import React from 'react';

export default function VermeilLoader() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-white'>
			<div className='relative overflow-hidden'>
				<div className='text-6xl font-bold text-gray-200 font-serif'>VERMEIL</div>
				<div className='absolute top-0 left-0 text-6xl font-bold text-gray-900 whitespace-nowrap animate-loading-fill font-serif'>
					VERMEIL
				</div>
			</div>
		</div>
	);
}
