'use client';

import { useAction } from 'next-safe-action/hooks';
import { saveArticle } from '@/app/(main)/article/actions/saveArticle.action';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { UserFavorite } from '@prisma/client';

interface SaveArticleButtonProps {
	articleId: string;
	savedArticle: UserFavorite | null;
	user?: {
		id: string;
	};
}

export default function SaveArticleButton({ articleId, savedArticle, user }: SaveArticleButtonProps) {
	const { executeAsync } = useAction(saveArticle);
	const [openModal, setOpenModal] = useState(false);

	const onSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) {
			setOpenModal(true);
			return;
		}
		await executeAsync({ articleId });
		console.log('article saved');
	};

	return (
		<>
			{openModal && (
				<div className='w-xl h-40 bg-blue-500'>
					<p>Créer un compte</p>
				</div>
			)}
			<form
				onSubmit={onSaveArticle}
				className='w-full flex justify-center items-center mb-16'>
				<button
					type='submit'
					className={`flex items-center overflow-hidden group p-4 border border-gray-300 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer xl:fixed xl:z-10 xl:left-8 xl:w-[58px] xl:hover:w-[158px]`}>
					<Bookmark
						size={24}
						className={`flex-shrink-0 ${savedArticle && 'fill-black'}`}
					/>
					<span className='ml-2 xl:opacity-0 xl:transform xl:translate-x-2 xl:transition-all xl:duration-300 xl:ease-in-out group-hover:xl:opacity-100 group-hover:xl:translate-x-0 whitespace-nowrap'>
						Sauvegarder
					</span>
				</button>
			</form>
		</>
	);
}
