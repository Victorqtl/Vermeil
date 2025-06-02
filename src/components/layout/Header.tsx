'use client';

import { Menu, Search, User, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';

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
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
			} ${darkMode ? 'h-[69px] border-b border-gray-100' : ''}`}>
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

					<div className='hidden md:flex items-center gap-4'>
						<Link
							href='/search'
							className={`hover:opacity-70 transition-opacity cursor-pointer ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							<Search size={20} />
						</Link>
						<div className='w-px h-8 bg-gray-200'></div>
						<div className={`group relative ${isScrolled || darkMode ? 'text-gray-900' : 'text-white'}`}>
							<div className='flex items-center hover:opacity-70 transition-opacity cursor-pointer'>
								<User size={20} />
								{session?.user ? (
									<ChevronDown
										size={26}
										strokeWidth={1}
									/>
								) : null}
							</div>
							{session?.user && (
								<>
									<div className='hidden group-hover:block absolute -left-24 top-6 w-42 h-full bg-transparent z-5'></div>
									<div className='hidden group-hover:flex flex-col items-start absolute -left-24 top-8 text-sm shadow-md z-10 bg-white text-gray-900'>
										<Link
											href='/account/profile'
											className='hover:bg-gray-100 w-full py-3 px-8 transition-colors whitespace-nowrap block'>
											Mon compte
										</Link>
										<div className='h-px bg-gray-200 w-4/5 mx-auto'></div>
										<button
											onClick={() => {
												authClient.signOut();
												redirect('/auth/sign-in');
											}}
											className='hover:bg-gray-100 py-3 px-8 w-full transition-colors whitespace-nowrap cursor-pointer text-left'>
											Se déconnecter
										</button>
									</div>
								</>
							)}
						</div>
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
					<div
						className={`md:hidden absolute top-full left-0 right-0 py-4 px-4 animate-fadeIn ${
							isScrolled || darkMode ? 'bg-white shadow-md' : 'bg-transparent'
						}`}>
						<nav
							className={`flex flex-col space-y-4 text-black font-medium ${
								isScrolled || darkMode ? 'text-gray-900' : 'text-white'
							}`}>
							<div className='flex flex-col gap-4 pb-4 border-b border-gray-200'>
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
								<a
									className={`flex items-center gap-2 ${
										isScrolled || darkMode ? 'text-gray-900' : 'text-white'
									}`}>
									<Search size={18} />
									<span>Rechercher</span>
								</a>
							</div>
							<div className='flex flex-col gap-4'>
								{session?.user ? (
									<div className='flex items-center gap-2'>
										<User size={18} />
										<Link href='/account/profile'>Mon compte</Link>
									</div>
								) : null}
								{session?.user ? (
									<button
										onClick={() => {
											authClient.signOut();
											setIsMenuOpen(false);
											redirect('/auth/sign-in');
										}}
										className='flex items-center gap-2 hover:text-gray-700 transition-colors'>
										<span>Se déconnecter</span>
									</button>
								) : (
									<a
										href='/auth/sign-in'
										className='flex items-center gap-2 hover:text-gray-700 transition-colors'>
										<User size={18} />
										<span>Se connecter</span>
									</a>
								)}
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
