import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<Header darkMode={true} />
			<div className='mt-28 mb-20 md:mb-0 md:mt-0 flex justify-center items-center flex-grow px-4'>
				<div className='max-w-md w-full text-center'>
					<h1 className='font-serif text-9xl font-bold mb-4'>401</h1>
					<h2 className='font-serif text-2xl mb-6'>Non autorisé</h2>
					<p className='text-gray-600 mb-8'>Veuillez vous connecter pour accéder à cette page.</p>
					<Link
						href='/auth/sign-in'
						className='inline-flex items-center bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors group'>
						Se connecter
						<ArrowRight
							size={18}
							className='ml-2 transition-transform duration-200 group-hover:translate-x-1'
						/>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}
