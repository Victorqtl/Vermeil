import { MessageCircle } from 'lucide-react';
import CommentItem from './CommentItem';

interface CommentListProps {
	comments: Array<{
		id: string;
		text: string;
		createdAt: Date;
		updatedAt: Date;
		user: {
			id: string;
			name: string;
			image?: string | null;
		};
	}>;
	currentUser?: {
		id: string;
	} | null;
	onCommentsUpdated?: () => void;
}

export default function CommentList({ comments, currentUser, onCommentsUpdated }: CommentListProps) {
	if (comments.length === 0) {
		return (
			<div className='text-center py-12'>
				<MessageCircle size={48} className='text-gray-300 mx-auto mb-4' />
				<h3 className='text-lg font-semibold text-gray-600 mb-2'>
					Aucun commentaire pour le moment
				</h3>
				<p className='text-gray-500'>
					Soyez le premier à partager votre avis sur cet article !
				</p>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center mb-6'>
				<MessageCircle size={20} className='text-gray-600 mr-2' />
				<h3 className='text-xl font-semibold text-gray-900'>
					{comments.length} commentaire{comments.length > 1 ? 's' : ''}
				</h3>
			</div>
			
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					comment={comment}
					currentUser={currentUser}
					onCommentUpdated={onCommentsUpdated}
				/>
			))}
		</div>
	);
}