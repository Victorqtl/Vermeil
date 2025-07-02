'use client';

import { Menu, Search, User, X, ChevronDown, LogOut } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

interface HeaderProps {
	whiteHeader?: boolean;
}

export default function Header({ whiteHeader = false }: HeaderProps) {
	const { data: session } = authClient.useSession();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const closeMobileMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header
			ref={mobileMenuRef}
			role='banner'
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
			} ${whiteHeader && 'flex items-center h-[64px] border-b border-gray-100 bg-white shadow-none'}`}>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='flex items-center justify-between'>
					<Link
						href='/'
						className='text-2xl md:text-3xl font-serif font-bold tracking-tight'
						aria-label='Accueil Vermeil'>
						<span className={isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'}>
							VERMEIL
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav
						className='hidden md:flex items-center space-x-8'
						role='navigation'
						aria-label='Navigation principale'>
						<Link
							href='/mode'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							Mode
						</Link>
						<Link
							href='/soins'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							Soins
						</Link>
						<Link
							href='/lifestyle'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							Lifestyle
						</Link>
						<Link
							href='/culture'
							className={`font-medium hover:opacity-70 transition-opacity ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							Culture
						</Link>
					</nav>

					<div className='hidden md:flex items-center gap-4'>
						<Link
							href='/search'
							aria-label='Rechercher'
							className={`hover:opacity-70 transition-opacity cursor-pointer ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							<Search size={20} />
						</Link>
						<div
							className='w-px h-8 bg-gray-200'
							aria-hidden='true'></div>
						<div className={`group relative ${isScrolled || whiteHeader ? 'text-gray-900' : 'text-white'}`}>
							<div className='flex items-center hover:opacity-70 transition-opacity cursor-pointer'>
								<Link
									href={session?.user ? '/account/profile' : '/auth/sign-in'}
									aria-label={session?.user ? 'Mon compte' : 'Se connecter'}
									className={`hover:opacity-70 transition-opacity ${
										isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
									}`}>
									<User size={20} />
								</Link>
								{session?.user ? (
									<ChevronDown
										size={26}
										strokeWidth={1}
										aria-hidden='true'
									/>
								) : null}
							</div>
							{session?.user && (
								<>
									<div className='hidden group-hover:block absolute -left-24 top-6 w-42 h-full bg-transparent z-5'></div>
									<div
										className='hidden group-hover:flex flex-col items-start absolute -left-24 top-8 text-sm shadow-md z-10 bg-white text-gray-900'
										role='menu'
										aria-label='Menu utilisateur'>
										<Link
											href='/account/profile'
											role='menuitem'
											className='hover:bg-gray-100 w-full py-3 px-8 transition-colors whitespace-nowrap block'>
											Mon compte
										</Link>
										<div
											className='h-px bg-gray-200 w-4/5 mx-auto'
											aria-hidden='true'></div>
										<button
											onClick={() => {
												authClient.signOut();
												router.push('/auth/sign-in');
											}}
											role='menuitem'
											className='hover:bg-gray-100 py-3 px-8 w-full transition-colors whitespace-nowrap cursor-pointer text-left'>
											Déconnexion
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
							aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
							aria-expanded={isMenuOpen}
							aria-controls='mobile-menu'
							className={`p-1 ${isScrolled || whiteHeader ? 'text-gray-900' : 'text-white'}`}>
							{isMenuOpen ? (
								<X
									size={24}
									className='text-gray-900'
								/>
							) : (
								<Menu size={24} />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div
						id='mobile-menu'
						role='menu'
						aria-label='Navigation mobile'
						className={`md:hidden absolute top-full left-0 right-0 py-4 px-4 animate-fadeIn ${
							isScrolled || whiteHeader || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
						}`}>
						<nav
							className={`flex flex-col space-y-4 text-black font-medium ${
								isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
							}`}>
							<div className='flex flex-col gap-4 pb-4 border-b border-gray-200'>
								<Link
									href='/mode'
									onClick={closeMobileMenu}
									role='menuitem'
									className='hover:text-gray-700 transition-colors'>
									Mode
								</Link>
								<Link
									href='/soins'
									onClick={closeMobileMenu}
									role='menuitem'
									className='hover:text-gray-700 transition-colors'>
									Soins
								</Link>
								<Link
									href='/lifestyle'
									onClick={closeMobileMenu}
									role='menuitem'
									className='hover:text-gray-700 transition-colors'>
									Lifestyle
								</Link>
								<Link
									href='/culture'
									onClick={closeMobileMenu}
									role='menuitem'
									className='hover:text-gray-700 transition-colors'>
									Culture
								</Link>
								<Link
									href='/search'
									onClick={closeMobileMenu}
									role='menuitem'
									aria-label='Rechercher'
									className={`flex items-center gap-2 ${
										isScrolled || whiteHeader || isMenuOpen ? 'text-gray-900' : 'text-white'
									}`}>
									<Search size={18} />
									<span>Rechercher</span>
								</Link>
							</div>
							<div className='flex flex-col gap-4'>
								{session?.user ? (
									<Link
										href='/account/profile'
										onClick={closeMobileMenu}
										role='menuitem'
										className='flex items-center gap-2'>
										<User size={18} />
										<span>Mon compte</span>
									</Link>
								) : null}
								{session?.user ? (
									<button
										onClick={() => {
											authClient.signOut();
											closeMobileMenu();
											router.push('/auth/sign-in');
										}}
										role='menuitem'
										className='flex items-center gap-2 hover:text-gray-700 transition-colors'>
										<LogOut
											size={18}
											className='text-gray-900'
										/>
										<span>Déconnexion</span>
									</button>
								) : (
									<Link
										href='/auth/sign-in'
										onClick={closeMobileMenu}
										role='menuitem'
										className='flex items-center gap-2 hover:text-gray-700 transition-colors'>
										<User size={18} />
										<span>Se connecter</span>
									</Link>
								)}
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
