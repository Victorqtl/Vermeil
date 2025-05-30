'use client';

import { Menu, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

interface HeaderProps {
	darkMode?: boolean;
}

export default function Header({ darkMode = false }: HeaderProps) {
	const { data: session } = authClient.useSession();
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
			className={`fixed w-full h-[69px] z-50 transition-all duration-300 ${
				isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
			} ${darkMode ? 'border-b border-gray-100' : ''}`}>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='flex items-center justify-between'>
					<a
						href='/'
						className='text-2xl md:text-3xl font-serif font-bold tracking-tight'>
						<span className={isScrolled || darkMode ? 'text-gray-900' : 'text-white'}>VERMEIL</span>
					</a>

					{/* Desktop Navigation */}
					<nav className='hidden md:flex items-center space-x-8'>
						<Link
							href='/mode'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							Mode
						</Link>
						<Link
							href='/soins'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							Soins
						</Link>
						<Link
							href='/lifestyle'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							Lifestyle
						</Link>
						<Link
							href='/culture'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							Culture
						</Link>
					</nav>

					<div className='hidden md:flex gap-6'>
						<Link
							href='/search'
							className={`hover:opacity-70 transition-opacity cursor-pointer ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							<Search size={20} />
						</Link>
						<Link
							href={session?.user ? '/account/profile' : '/auth/sign-in'}
							className={`hover:opacity-70 transition-opacity ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							<User size={20} />
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className={`p-1 ${isScrolled || darkMode ? 'text-gray-900' : 'text-white'}`}>
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
