import { Article, Category } from '../types/types';

export const articles: Article[] = [
	{
		id: '1',
		title: 'Les tendances incontournables de la saison automne-hiver',
		category: 'mode',
		excerpt: 'Découvrez les pièces essentielles qui définiront votre garde-robe pour la saison à venir.',
		imageUrl:
			'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		featured: true,
		date: '15 Octobre 2025',
		readTime: 8,
	},
	{
		id: '2',
		title: 'Guide complet du rasage parfait pour homme moderne',
		category: 'soins',
		excerpt: 'Les techniques et produits indispensables pour un rasage impeccable et sans irritation.',
		imageUrl:
			'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		featured: true,
		date: '10 Octobre 2025',
		readTime: 6,
	},
	{
		id: '3',
		title: 'Comment adopter un lifestyle minimaliste sans compromis',
		category: 'lifestyle',
		excerpt: 'Simplifiez votre quotidien tout en préservant qualité et style avec ces conseils pratiques.',
		imageUrl:
			'https://images.pexels.com/photos/6186812/pexels-photo-6186812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		featured: true,
		date: '5 Octobre 2025',
		readTime: 10,
	},
	{
		id: '4',
		title: 'Les montres qui définissent le succès - Guide 2025',
		category: 'mode',
		excerpt: 'Sélection des garde-temps qui allient prestige, fonctionnalité et investissement durable.',
		imageUrl:
			'https://images.pexels.com/photos/9978724/pexels-photo-9978724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		date: '1 Octobre 2025',
		readTime: 7,
	},
	{
		id: '5',
		title: "L'art du parfum masculin : choisir sa signature olfactive",
		category: 'soins',
		excerpt: 'Comment sélectionner et porter le parfum qui vous représente vraiment, selon les experts.',
		imageUrl:
			'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		date: '25 Septembre 2025',
		readTime: 5,
	},
	{
		id: '6',
		title: 'Les expositions culturelles à ne pas manquer cet automne',
		category: 'culture',
		excerpt: 'Notre sélection des événements artistiques qui marqueront la saison culturelle.',
		imageUrl:
			'https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		date: '20 Septembre 2025',
		readTime: 8,
	},
];

export const categories: Category[] = [
	{
		id: 'mode',
		name: 'Mode',
		description: 'Tendances, conseils et inspirations pour affirmer votre style',
		imageUrl:
			'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		slug: 'mode',
	},
	{
		id: 'soins',
		name: 'Soins',
		description: 'Produits et rituels pour prendre soin de vous au quotidien',
		imageUrl:
			'https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		slug: 'soins',
	},
	{
		id: 'lifestyle',
		name: 'Lifestyle',
		description: 'Art de vivre, déco et bien-être pour un quotidien raffiné',
		imageUrl:
			'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		slug: 'lifestyle',
	},
	{
		id: 'culture',
		name: 'Culture',
		description: 'Livres, films, musique et événements qui façonnent notre époque',
		imageUrl:
			'https://images.pexels.com/photos/7034646/pexels-photo-7034646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		slug: 'culture',
	},
];
