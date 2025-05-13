import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Endpoint pour créer un nouvel article
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		// Valider les données requises
		const { title, slug, heroImage, readTime, categoryId } = body;

		if (!title || !slug || !heroImage || !readTime || !categoryId) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		// Vérifier si le slug existe déjà
		const existingArticle = await prisma.article.findUnique({
			where: { slug },
		});

		if (existingArticle) {
			return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 400 });
		}

		// Créer un nouvel article
		const article = await prisma.article.create({
			data: {
				title,
				slug,
				excerpt: body.excerpt || null,
				heroImage,
				readTime: Number(readTime),
				featured: body.featured || false,
				categoryId,
			},
		});

		return NextResponse.json(article, { status: 201 });
	} catch (error) {
		console.error('Error creating article:', error);
		return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
	}
}

// Endpoint pour récupérer tous les articles
export async function GET() {
	try {
		const articles = await prisma.article.findMany({
			include: {
				category: true,
			},
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
