'use client';

import { useOptimisticAction } from 'next-safe-action/hooks';
import { saveArticle } from '@/app/(main)/article/actions/saveArticle.action';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bookmark, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SaveArticleButtonProps {
	articleId: string;
	savedArticle: {
		id: string;
	} | null;
	user?: {
		id: string;
	};
}

export default function SaveArticleButton({ articleId, savedArticle, user }: SaveArticleButtonProps) {
	const { execute, optimisticState } = useOptimisticAction(saveArticle, {
		currentState: { isSaved: !!savedArticle },
		updateFn: state => {
			return { isSaved: !state.isSaved };
		},
	});
	const [openModal, setOpenModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!openModal) return;

		const modal = modalRef.current;
		if (!modal) return;

		const focusableElements = modal.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		firstElement?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOpenModal(false);
				return;
			}

			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement?.focus();
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement?.focus();
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [openModal]);

	const onSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) {
			setOpenModal(true);
			return;
		}

		execute({ articleId });
	};
	const isBookmarked = optimisticState.isSaved;

	return (
		<>
			{openModal && (
				<div
					className='flex flex-col items-center justify-center inset-0 fixed bg-black/50 z-50 p-4'
					onClick={e => {
						if (e.target === e.currentTarget) {
							setOpenModal(false);
						}
					}}>
					<div
						ref={modalRef}
						className='relative flex flex-col items-center justify-center max-w-[480px] h-fit bg-white px-10 py-8 md:py-10'>
						<button
							className='absolute top-4 right-4 cursor-pointer'
							onClick={() => setOpenModal(false)}>
							<X
								size={26}
								strokeWidth={1}
							/>
						</button>
						<div className='mb-4 font-serif text-3xl font-bold text-center'>
							Sauvegarder vos articles avec un compte
						</div>
						<Image
							src='https://images.unsplash.com/photo-1705167113320-bffc1c860e6f?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt="Tableau d'un homme assis devant son bureau"
							className='w-[200px] h-[200px] object-cover mb-4'
							width={500}
							height={500}
						/>
						<p className='mb-6 text-center leading-relaxed'>
							Après vous être connecté, vous pouvez enregistrer des articles et les consulter facilement
							sur n'importe quel appareil, même hors ligne.
						</p>
						<Button className='flex items-center justify-center w-full mb-2'>
							<Link href='/auth/sign-up'>Créer un compte</Link>
							<ArrowRight
								size={18}
								className='ml-2 transition-transform duration-300 group-hover:translate-x-1'
							/>
						</Button>
						<p className='text-sm text-gray-600'>
							Vous avez déjà un compte ?{' '}
							<Link
								href='/auth/sign-in'
								className='text-gray-900 font-bold hover:underline'>
								Se connecter
							</Link>
						</p>
					</div>
				</div>
			)}
			<form
				onSubmit={onSaveArticle}
				className='w-full flex justify-center items-center mb-16'>
				<button
					type='submit'
					className={`flex items-center overflow-hidden group p-4 bg-white border border-gray-300 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer xl:fixed xl:z-10 xl:left-8 xl:w-[58px] xl:hover:w-[158px]`}>
					<Bookmark
						size={24}
						className={`flex-shrink-0 transition-all duration-200 ${
							isBookmarked ? 'fill-gray-900 text-gray-900' : 'text-gray-900'
						}`}
					/>
					<span className='ml-2 xl:opacity-0 xl:transform xl:translate-x-2 xl:transition-all xl:duration-300 xl:ease-in-out group-hover:xl:opacity-100 group-hover:xl:translate-x-0 whitespace-nowrap'>
						{isBookmarked ? 'Sauvegardé' : 'Sauvegarder'}
					</span>
				</button>
			</form>
		</>
	);
}
