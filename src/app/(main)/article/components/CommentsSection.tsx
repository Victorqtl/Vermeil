import { getCachedCommentsByArticleId } from '@/lib/data/comments';
import CommentsList from '@/app/(main)/article/components/comments/CommentsList';

interface CommentsSectionProps {
	articleId: string;
	user: {
		id: string;
		name: string;
		image?: string | null;
	} | null;
}

export default async function CommentsSection({ articleId, user }: CommentsSectionProps) {
	const comments = await getCachedCommentsByArticleId(articleId)();

	return (
		<CommentsList
			articleId={articleId}
			currentUser={user}
			comments={comments}
		/>
	);
}
