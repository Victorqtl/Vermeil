'use client';

import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<footer className='bg-gray-900 text-white pt-16 pb-8'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
					<div>
						<h3 className='text-2xl font-serif font-bold mb-4'>VERMEIL</h3>
						<p className='text-gray-400 mb-6'>
							Guide lifestyle dédié aux hommes modernes, curieux et exigeants.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								<Instagram size={20} />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								<Twitter size={20} />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors'>
								<Facebook size={20} />
							</a>
						</div>
					</div>

					<div>
						<h4 className='font-medium uppercase text-sm tracking-wider mb-4'>Navigation</h4>
						<ul className='space-y-2'>
							<li>
								<a
									href='/mode'
									className='text-gray-400 hover:text-white transition-colors'>
									Mode
								</a>
							</li>
							<li>
								<a
									href='/soins'
									className='text-gray-400 hover:text-white transition-colors'>
									Soins
								</a>
							</li>
							<li>
								<a
									href='/lifestyle'
									className='text-gray-400 hover:text-white transition-colors'>
									Lifestyle
								</a>
							</li>
							<li>
								<a
									href='/culture'
									className='text-gray-400 hover:text-white transition-colors'>
									Culture
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-medium uppercase text-sm tracking-wider mb-4'>À propos</h4>
						<ul className='space-y-2'>
							<li>
								<a
									href='/a-propos'
									className='text-gray-400 hover:text-white transition-colors'>
									Notre histoire
								</a>
							</li>
							<li>
								<a
									href='/equipe'
									className='text-gray-400 hover:text-white transition-colors'>
									Notre équipe
								</a>
							</li>
							<li>
								<a
									href='/contact'
									className='text-gray-400 hover:text-white transition-colors'>
									Contact
								</a>
							</li>
							<li>
								<a
									href='/partenariats'
									className='text-gray-400 hover:text-white transition-colors'>
									Partenariats
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className='font-medium uppercase text-sm tracking-wider mb-4'>Légal</h4>
						<ul className='space-y-2'>
							<li>
								<a
									href='/mentions-legales'
									className='text-gray-400 hover:text-white transition-colors'>
									Mentions légales
								</a>
							</li>
							<li>
								<a
									href='/confidentialite'
									className='text-gray-400 hover:text-white transition-colors'>
									Politique de confidentialité
								</a>
							</li>
							<li>
								<a
									href='/cookies'
									className='text-gray-400 hover:text-white transition-colors'>
									Politique des cookies
								</a>
							</li>
							<li>
								<a
									href='/cgu'
									className='text-gray-400 hover:text-white transition-colors'>
									CGU
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800'>
					<p className='text-gray-500 text-sm mb-4 md:mb-0'>
						© {new Date().getFullYear()} VERMEIL. Tous droits réservés.
					</p>
					<button
						onClick={scrollToTop}
						className='flex items-center text-gray-400 hover:text-white transition-colors group'>
						<span className='mr-2'>Retour en haut</span>
						<ArrowUp
							size={16}
							className='transition-transform group-hover:-translate-y-1'
						/>
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
