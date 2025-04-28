'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
			}`}>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='flex items-center justify-between'>
					<a
						href='/'
						className='text-2xl md:text-3xl font-serif font-bold tracking-tight'>
						<span className={isScrolled ? 'text-black' : 'text-white'}>VERMEIL</span>
					</a>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<a
							href='/mode'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							Mode
						</a>
						<a
							href='/soins'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							Soins
						</a>
						<a
							href='/lifestyle'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							Lifestyle
						</a>
						<a
							href='/culture'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							Culture
						</a>
					</nav>

					<div className='hidden md:flex  gap-4'>
						<button
							className={`hover:opacity-70 transition-opacity cursor-pointer ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							<Search size={20} />
						</button>
						<a
							href='/'
							className={`hover:opacity-70 transition-opacity ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							<User size={20} />
						</a>
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className={`p-1 ${isScrolled ? 'text-black' : 'text-white'}`}>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fadeIn'>
						<nav className='flex flex-col space-y-4'>
							<a
								href='/mode'
								className='text-black font-medium hover:text-gray-700 transition-colors'>
								Mode
							</a>
							<a
								href='/soins'
								className='text-black font-medium hover:text-gray-700 transition-colors'>
								Soins
							</a>
							<a
								href='/lifestyle'
								className='text-black font-medium hover:text-gray-700 transition-colors'>
								Lifestyle
							</a>
							<a
								href='/culture'
								className='text-black font-medium hover:text-gray-700 transition-colors'>
								Culture
							</a>
							<div className='pt-2 flex items-center border-t border-gray-200'>
								<Search
									size={18}
									className='text-gray-500 mr-2'
								/>
								<input
									type='text'
									placeholder='Rechercher...'
									className='w-full bg-transparent focus:outline-none text-black'
								/>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};

export default Navbar;
