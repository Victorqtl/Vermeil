'use client';

import React, { useEffect, useState } from 'react';
import ArrowLinkButton from '../../../components/ui/arrow-link-button';

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
		<section className='relative h-[50vh] md:h-screen flex items-center justify-center overflow-hidden'>
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
				<div className='max-w-3xl mx-auto'>
					<h1 className='font-serif text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight'>
						L’excellence n’est pas un hasard.
					</h1>
					<p className='text-lg md:text-2xl text-white/90 mb-8 leading-relaxed'>
						Vermeil vous accompagne dans votre quête de raffinement et de distinction au quotidien.
					</p>
					<ArrowLinkButton
						href='/articles'
						text='Découvrir nos articles'
					/>
				</div>
			</div>

			{showScrollIndicator && (
				<div className='hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-300'>
					<div className='w-10 h-14 border-2 border-white rounded-full flex items-start justify-center p-1'>
						<div className='w-1.5 h-3 bg-white rounded-full animate-scrollDown'></div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Hero;
