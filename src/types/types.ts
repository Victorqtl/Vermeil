export interface Article {
  id: string;
  title: string;
  category: 'mode' | 'soins' | 'lifestyle' | 'culture';
  excerpt: string;
  imageUrl: string;
  featured?: boolean;
  date: string;
  readTime: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}