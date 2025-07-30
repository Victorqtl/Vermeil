'use client';

import { useOptimistic, startTransition } from 'react';
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

type CommentAction = 
	| { type: 'CREATE'; comment: Comment }
	| { type: 'UPDATE'; commentId: string; text: string }
	| { type: 'DELETE'; commentId: string };

export default function CommentsList({ articleId, comments, currentUser }: CommentsListProps) {
	const [optimisticComments, addOptimisticComment] = useOptimistic(
		comments,
		(state: Comment[], action: CommentAction) => {
			switch (action.type) {
				case 'CREATE':
					return [...state, action.comment];
				case 'UPDATE':
					return state.map(comment =>
						comment.id === action.commentId 
							? { ...comment, text: action.text, updatedAt: new Date() }
							: comment
					);
				case 'DELETE':
					return state.filter(comment => comment.id !== action.commentId);
				default:
					return state;
			}
		}
	);

	const handleCreateComment = async (text: string) => {
		if (!currentUser) return;
		
		const optimisticComment: Comment = {
			id: `temp-${Date.now()}`,
			text,
			createdAt: new Date(),
			updatedAt: new Date(),
			user: {
				id: currentUser.id,
				name: currentUser.name,
				image: currentUser.image || null,
			},
		};

		startTransition(() => {
			addOptimisticComment({ type: 'CREATE', comment: optimisticComment });
		});
		await createComment({ articleId, text });
	};

	const handleUpdateComment = async (commentId: string, text: string) => {
		startTransition(() => {
			addOptimisticComment({ type: 'UPDATE', commentId, text });
		});
		await updateComment({ commentId, text });
	};

	const handleDeleteComment = async (commentId: string) => {
		startTransition(() => {
			addOptimisticComment({ type: 'DELETE', commentId });
		});
		await deleteComment({ commentId });
	};

	const currentComments = optimisticComments;

	if (currentComments.length === 0) {
		return (
			<div className='bg-gray-50 py-16'>
				<div className='max-w-3xl mx-auto px-4 md:px-6'>
					<div className='space-y-8'>
						<CommentForm
							user={currentUser}
							onCreateComment={handleCreateComment}
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
						onCreateComment={handleCreateComment}
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
								onUpdateComment={handleUpdateComment}
								onDeleteComment={handleDeleteComment}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
