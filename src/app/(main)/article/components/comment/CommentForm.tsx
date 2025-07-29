'use client';

import { useAction } from 'next-safe-action/hooks';
import { createComment } from '@/app/(main)/article/actions/createComment.action';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MessageCircle, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CommentFormProps {
	articleId: string;
	user?: {
		id: string;
		name: string;
		image?: string | null;
	} | null;
	initialComments: {
		id: string;
		text: string;
		createdAt: Date;
		updatedAt: Date;
	}[];
}

export default function CommentForm({ articleId, user }: CommentFormProps) {
	const [text, setText] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const { execute, isExecuting } = useAction(createComment, {
		onSuccess: () => {
			setText('');
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) {
			setOpenModal(true);
			return;
		}

		if (!text.trim()) return;

		execute({ articleId, text: text.trim() });
	};

	if (!user) {
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
						<div className='relative flex flex-col items-center justify-center max-w-[480px] h-fit bg-white px-10 py-8 md:py-10'>
							<button
								className='absolute top-4 right-4 cursor-pointer'
								onClick={() => setOpenModal(false)}>
								<X
									size={26}
									strokeWidth={1}
								/>
							</button>
							<div className='mb-4 font-serif text-3xl font-bold text-center'>
								Connectez-vous pour commenter
							</div>
							<MessageCircle
								size={80}
								className='text-gray-400 mb-4'
							/>
							<p className='mb-6 text-center leading-relaxed'>
								Rejoignez la conversation ! Connectez-vous pour partager vos pensées et échanger avec la
								communauté.
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
				<div className='bg-gray-50 p-6 border border-gray-200'>
					<div className='flex items-center mb-4'>
						<h3 className='text-lg font-semibold text-gray-900'>Laisser un commentaire</h3>
					</div>
					<p className='text-gray-600 mb-4'>
						Connectez-vous pour participer à la conversation et partager votre avis sur cet article.
					</p>
					<Button onClick={() => setOpenModal(true)}>Se connecter pour commenter</Button>
				</div>
			</>
		);
	}

	return (
		<div className='bg-white p-6 border border-gray-200'>
			<div className='flex items-center mb-4'>
				<div className='w-10 h-10 rounded-full overflow-hidden mr-3'>
					{user.image ? (
						<Image
							src={user.image}
							alt={user.name}
							width={40}
							height={40}
							className='object-cover w-full h-full'
						/>
					) : (
						<div className='w-full h-full bg-gray-300 flex items-center justify-center'>
							<span className='text-gray-600 text-sm font-medium'>
								{user.name.charAt(0).toUpperCase()}
							</span>
						</div>
					)}
				</div>
				<div>
					<h3 className='text-lg font-semibold text-gray-900'>Laisser un commentaire</h3>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-4'>
				<div>
					<Label
						htmlFor='comment-text'
						className='sr-only'>
						Votre commentaire
					</Label>
					<textarea
						id='comment-text'
						value={text}
						onChange={e => setText(e.target.value)}
						placeholder='Partagez votre avis sur cet article...'
						className='w-full min-h-[120px] p-4 border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
						maxLength={1000}
						disabled={isExecuting}
					/>
					<p className='text-xs text-gray-500 mt-1'>{text.length}/1000 caractères</p>
				</div>

				<div className='flex justify-end'>
					<Button
						type='submit'
						disabled={!text.trim() || isExecuting}
						className='flex items-center'>
						{isExecuting ? 'Publication...' : 'Publier'}
					</Button>
				</div>
			</form>
		</div>
	);
}
