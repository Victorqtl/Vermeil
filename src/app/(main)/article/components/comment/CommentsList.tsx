import { MessageCircle } from 'lucide-react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface CommentsListProps {
	articleId: string;
	currentUser?: {
		id: string;
		name: string;
		image?: string | null;
	} | null;
	comments: {
		id: string;
		text: string;
		createdAt: Date;
		updatedAt: Date;
		user: {
			id: string;
			name: string;
			image?: string | null;
		};
	}[];
}

export default async function CommentsList({ articleId, comments, currentUser }: CommentsListProps) {
	if (comments.length === 0) {
		return (
			<div className='bg-gray-50 py-16'>
				<div className='max-w-3xl mx-auto px-4 md:px-6'>
					<div className='space-y-8'>
						<CommentForm
							articleId={articleId}
							initialComments={comments}
							user={currentUser}
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
						articleId={articleId}
						user={currentUser}
						initialComments={comments}
					/>
					<div className='space-y-6'>
						<div className='flex items-center mb-6'>
							<MessageCircle
								size={20}
								className='text-gray-600 mr-2'
							/>
							<h3 className='text-xl font-semibold text-gray-900'>
								{comments.length} commentaire{comments.length > 1 ? 's' : ''}
							</h3>
						</div>

						{comments.map(comment => (
							<CommentItem
								key={comment.id}
								comment={comment}
								currentUser={currentUser}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
