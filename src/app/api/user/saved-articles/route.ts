import { getUser } from '@/lib/auth-session';
import { getCachedUserSavedArticles } from '@/lib/data/articles';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const user = await getUser();
		
		if (!user) {
			return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
		}

		const savedArticles = await getCachedUserSavedArticles(user.id);
		
		return NextResponse.json({ articles: savedArticles });
	} catch (error) {
		console.error('Erreur lors de la récupération des articles sauvegardés:', error);
		return NextResponse.json(
			{ error: 'Erreur lors de la récupération des articles sauvegardés' },
			{ status: 500 }
		);
	}
}