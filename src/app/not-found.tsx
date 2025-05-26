import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='flex flex-col justify-between min-h-screen'>
			<Header darkMode={true} />
			<div className='flex justify-center items-center flex-grow px-4'>
				<div className='max-w-md w-full text-center'>
					<h1 className='font-serif text-9xl font-bold mb-4'>404</h1>
					<h2 className='font-serif text-2xl mb-6'>Page introuvable</h2>
					<p className='text-gray-600 mb-8'>
						La page que vous recherchez n&apos;existe pas ou a été déplacée.
					</p>
					<Link
						href='/'
						className='inline-flex items-center bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors group'>
						<ArrowLeft
							size={18}
							className='mr-2 transition-transform group-hover:-translate-x-1'
						/>
						Retour à l&apos;accueil
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}
