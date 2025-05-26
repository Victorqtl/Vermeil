'use client';

import { useState } from 'react';
import SavedArticles from './SavedArticles';
import { Article } from '@/types/article';

interface UserProfileProps {
	initialSavedArticles: Article[];
	user: {
		id: string;
		name: string;
		email: string;
		image?: string | null;
	};
}

export default function UserProfile({ initialSavedArticles, user }: UserProfileProps) {
	const [activeTab, setActiveTab] = useState('profile');
	return (
		<>
			<div className='flex gap-4 border-b border-gray-200'>
				<button
					onClick={() => setActiveTab('profile')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500hover:text-gray-900 ${
						activeTab === 'profile' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Profil
				</button>
				<button
					onClick={() => setActiveTab('saved-articles')}
					className={`px-6 py-4 cursor-pointer font-medium text-gray-500 hover:text-gray-900 ${
						activeTab === 'saved-articles' ? 'text-gray-900 border-b-2 border-gray-900' : ''
					}`}>
					Articles Sauvegardés
				</button>
			</div>
			{activeTab === 'profile' && <div>Profil</div>}
			{activeTab === 'saved-articles' && (
				<>
					<SavedArticles initialData={initialSavedArticles} />
				</>
			)}
		</>
	);
}
