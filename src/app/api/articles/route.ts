import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Endpoint pour créer un nouvel article
// export async function POST(req: NextRequest) { // ... Entire POST function removed ... }

// Endpoint pour récupérer tous les articles
export async function GET() {
	try {
		const articles = await prisma.article.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(articles);
	} catch (error) {
		console.error('Error fetching articles:', error);
		return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
	}
}
