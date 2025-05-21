'use client';

import { Menu, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
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
						<span className={isScrolled ? 'text-gray-900' : 'text-white'}>VERMEIL</span>
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

					<div className='hidden md:flex gap-6'>
						<a
							className={`hover:opacity-70 transition-opacity cursor-pointer ${
								isScrolled ? 'text-black' : 'text-white'
							}`}>
							<Search size={20} />
						</a>
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
						<nav className='flex flex-col space-y-4 text-black font-medium'>
							<div className='flex flex-col gap-4 pb-4 border-b border-gray-200'>
								<a
									href='/'
									className='flex items-center gap-2 hover:text-gray-700 transition-colors'>
									<User size={18} />
									<span>Se connecter</span>
								</a>

								<a className='flex items-center gap-2 text-black'>
									<Search size={18} />
									<span>Rechercher</span>
								</a>
							</div>
							<a
								href='/mode'
								className='hover:text-gray-700 transition-colors'>
								Mode
							</a>
							<a
								href='/soins'
								className='hover:text-gray-700 transition-colors'>
								Soins
							</a>
							<a
								href='/lifestyle'
								className='hover:text-gray-700 transition-colors'>
								Lifestyle
							</a>
							<a
								href='/culture'
								className='hover:text-gray-700 transition-colors'>
								Culture
							</a>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
