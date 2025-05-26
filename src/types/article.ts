export interface Article {
	id: string;
	title: string;
	slug: string;
	description: string;
	excerpt: string | null;
	heroImage: string;
	readTime: number;
	category: string;
	createdAt: Date;
	updatedAt: Date;
}
