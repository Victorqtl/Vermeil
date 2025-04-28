'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
	const [showScrollIndicator, setShowScrollIndicator] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollIndicator(window.scrollY < 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section className='relative h-screen flex items-center justify-center overflow-hidden'>
			{/* Background image with overlay */}
			<div
				className='absolute inset-0 bg-cover'
				style={{
					backgroundImage: 'url(https://images.pexels.com/photos/31699433/pexels-photo-31699433.jpeg)',
					backgroundPosition: 'center 20%',
				}}>
				<div className='absolute inset-0 bg-black opacity-40'></div>
			</div>

			{/* Content */}
			<div className='container mx-auto px-4 md:px-6 relative z-10 text-center'>
				<div className='max-w-2xl mx-auto'>
					<h1 className='font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
						L'élégance au masculin
					</h1>
					<p className='text-xl md:text-2xl text-white/90 mb-8 leading-relaxed'>
						Explorez l'art de vivre moderne à travers mode, soins et culture.
					</p>
					<a
						href='/articles'
						className='inline-flex items-center bg-white text-black px-6 py-3 rounded-none font-medium hover:bg-gray-100 transition-colors group'>
						Découvrir nos articles
						<ArrowRight
							size={18}
							className='ml-2 transition-transform duration-300 group-hover:translate-x-1'
						/>
					</a>
				</div>
			</div>

			{/* Scroll indicator */}
			{showScrollIndicator && (
				<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-300'>
					<div className='w-10 h-14 border-2 border-white rounded-full flex items-start justify-center p-1'>
						<div className='w-1.5 h-3 bg-white rounded-full animate-scrollDown'></div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Hero;
