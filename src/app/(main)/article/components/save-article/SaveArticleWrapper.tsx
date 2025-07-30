import { getUser } from '@/lib/auth-session';
import { getSavedArticlesById } from '@/lib/data/saved-articles';
import SaveArticle from './SaveArticle';

interface SaveArticleWrapperProps {
	articleId: string;
}

export default async function SaveArticleWrapper({ articleId }: SaveArticleWrapperProps) {
	const user = await getUser();
	const savedArticle = user?.id ? await getSavedArticlesById(user.id, articleId) : null;

	return (
		<SaveArticle
			articleId={articleId}
			savedArticle={savedArticle}
			user={user}
		/>
	);
}