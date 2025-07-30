'use client';

import { useOptimisticAction } from 'next-safe-action/hooks';
import { createComment } from '@/app/(main)/article/actions/createComment.action';
import { updateComment } from '@/app/(main)/article/actions/updateComment.action';
import { deleteComment } from '@/app/(main)/article/actions/deleteComment.action';
import { MessageCircle } from 'lucide-react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface Comment {
	id: string;
	text: string;
	createdAt: Date;
	updatedAt: Date;
	user: {
		id: string;
		name: string;
		image?: string | null;
	};
}

interface CommentsListProps {
	articleId: string;
	currentUser?: {
		id: string;
		name: string;
		image?: string | null;
	} | null;
	comments: Comment[];
}

export default function CommentsList({ articleId, comments, currentUser }: CommentsListProps) {
	const { execute: executeCreate, optimisticState: createOptimisticState } = useOptimisticAction(createComment, {
		currentState: { comments },
		updateFn: (state, newComment) => {
			if (!currentUser) return state;
			const optimisticComment: Comment = {
				id: `temp-${Date.now()}`,
				text: newComment.text,
				createdAt: new Date(),
				updatedAt: new Date(),
				user: {
					id: currentUser.id,
					name: currentUser.name,
					image: currentUser.image || null,
				},
			};
			return {
				comments: [...state.comments, optimisticComment],
			};
		},
	});

	const { execute: executeUpdate } = useOptimisticAction(updateComment, {
		currentState: createOptimisticState || { comments },
		updateFn: (state, { commentId, text }) => ({
			comments: state.comments.map(comment =>
				comment.id === commentId ? { ...comment, text, updatedAt: new Date() } : comment
			),
		}),
	});

	const { execute: executeDelete } = useOptimisticAction(deleteComment, {
		currentState: createOptimisticState || { comments },
		updateFn: (state, { commentId }) => ({
			comments: state.comments.filter(comment => comment.id !== commentId),
		}),
	});

	const currentComments = createOptimisticState?.comments || comments;

	if (currentComments.length === 0) {
		return (
			<div className='bg-gray-50 py-16'>
				<div className='max-w-3xl mx-auto px-4 md:px-6'>
					<div className='space-y-8'>
						<CommentForm
							user={currentUser}
							onCreateComment={(text: string) => executeCreate({ articleId, text })}
						/>
						<div className='text-center py-12'>
							<MessageCircle
								size={48}
								className='text-gray-300 mx-auto mb-4'
							/>
							<h3 className='text-lg font-semibold text-gray-600 mb-2'>
								Aucun commentaire pour le moment
							</h3>
							<p className='text-gray-500'>Soyez le premier à partager votre avis sur cet article !</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-gray-50 py-16'>
			<div className='max-w-3xl mx-auto px-4 md:px-6'>
				<div className='space-y-8'>
					<CommentForm
						user={currentUser}
						onCreateComment={(text: string) => executeCreate({ articleId, text })}
					/>
					<div className='space-y-6'>
						<div className='flex items-center mb-6'>
							<MessageCircle
								size={20}
								className='text-gray-600 mr-2'
							/>
							<h3 className='text-xl font-semibold text-gray-900'>
								{currentComments.length} commentaire{currentComments.length > 1 ? 's' : ''}
							</h3>
						</div>

						{currentComments.map(comment => (
							<CommentItem
								key={comment.id}
								comment={comment}
								currentUser={currentUser}
								onUpdateComment={(commentId: string, text: string) =>
									executeUpdate({ commentId, text })
								}
								onDeleteComment={(commentId: string) => executeDelete({ commentId })}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
