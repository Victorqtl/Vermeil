import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<div className='mt-28 mb-20 md:mb-0 md:mt-0 flex justify-center items-center flex-grow px-4'>
				<div className='max-w-md w-full text-center'>
					<h1 className='font-serif text-9xl font-bold mb-4'>404</h1>
					<h2 className='font-serif text-2xl mb-6'>Page introuvable</h2>
					<p className='text-gray-600 mb-8'>
						La page que vous recherchez n&apos;existe pas ou a été déplacée.
					</p>
					<Link
						href='/'
						className='inline-flex items-center bg-gray-900 text-white px-6 py-3 font-medium hover:bg-gray-700 transition-colors group'>
						<ArrowLeft
							size={18}
							className='mr-2 transition-transform duration-200 group-hover:-translate-x-1'
						/>
						Retour à l&apos;accueil
					</Link>
				</div>
			</div>
		</div>
	);
}
