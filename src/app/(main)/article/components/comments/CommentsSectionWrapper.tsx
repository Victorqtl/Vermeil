import { getCachedCommentsByArticleId } from '@/lib/data/comments';
import { getUser } from '@/lib/auth-session';
import CommentsList from '@/app/(main)/article/components/comments/CommentsList';

interface CommentsSectionWrapperProps {
	articleId: string;
}

export default async function CommentsSectionWrapper({ articleId }: CommentsSectionWrapperProps) {
	const [comments, user] = await Promise.all([
		getCachedCommentsByArticleId(articleId)(),
		getUser(),
	]);

	return (
		<CommentsList
			articleId={articleId}
			currentUser={user}
			comments={comments}
		/>
	);
}