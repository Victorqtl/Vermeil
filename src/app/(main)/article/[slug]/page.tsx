import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articles } from '../../../data/articles';

// This would come from your CMS or database in a real application
const articleData = {
	title: 'Les 7 meilleurs déodorants pour homme en 2025',
	heroImage:
		'https://images.pexels.com/photos/3059398/pexels-photo-3059398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	category: 'soins',
	date: '15 Mars 2025',
	readTime: 8,
	products: [
		{
			id: '1',
			name: 'Le Déodorant Naturel',
			description:
				"Une formule innovante à base d'ingrédients naturels qui offre une protection efficace pendant 24 heures. Sans aluminium et respectueux de votre peau, ce déodorant allie performance et bien-être.",
			image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			affiliateLink: '#',
		},
		{
			id: '2',
			name: "L'Anti-Transpirant Premium",
			description:
				"Spécialement conçu pour les hommes actifs, cet anti-transpirant offre une protection maximale contre la transpiration et les odeurs. Sa formule douce respecte l'équilibre naturel de la peau.",
			image: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			affiliateLink: '#',
		},
		// Add more products as needed
	],
};

export default function ArticlePage() {
	// Get 3 related articles from the same category
	const relatedArticles = articles
		.filter(article => article.category === articleData.category && article.title !== articleData.title)
		.slice(0, 3);

	return (
		<article className='min-h-screen bg-white'>
			{/* Hero Section */}
			<div className='relative h-[60vh] min-h-[500px] w-full'>
				<Image
					src={articleData.heroImage}
					alt={articleData.title}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-black bg-opacity-40' />
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='container mx-auto px-4 md:px-6 text-center'>
						<span className='inline-block bg-white px-4 py-2 mb-4 text-sm font-medium text-black uppercase tracking-wider'>
							{articleData.category}
						</span>
						<h1 className='text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
							{articleData.title}
						</h1>
						<div className='mt-6 text-white/90'>
							<span>{articleData.date}</span>
							<span className='mx-3'>•</span>
							<span>{articleData.readTime} min de lecture</span>
						</div>
					</div>
				</div>
			</div>

			{/* Products Section */}
			<div className='container mx-auto px-4 md:px-6 py-16'>
				<div className='max-w-3xl mx-auto'>
					{articleData.products.map((product, index) => (
						<div
							key={product.id}
							className='mb-16'>
							<Link
								href={product.affiliateLink}
								className='group block relative aspect-[16/9] mb-6 overflow-hidden'>
								<Image
									src={product.image}
									alt={product.name}
									fill
									className='object-cover transition-transform duration-500 group-hover:scale-105'
								/>
							</Link>
							<h2 className='text-2xl md:text-3xl font-serif font-bold mb-4'>
								{`${index + 1}. ${product.name}`}
							</h2>
							<p className='text-gray-600 leading-relaxed mb-6'>{product.description}</p>
							<Link
								href={product.affiliateLink}
								className='inline-flex items-center bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors group'>
								Voir le produit
								<ArrowRight
									size={18}
									className='ml-2 transition-transform group-hover:translate-x-1'
								/>
							</Link>
						</div>
					))}
				</div>
			</div>

			{/* Related Articles Section */}
			<div className='bg-gray-50 py-16'>
				<div className='container mx-auto px-4 md:px-6'>
					<h2 className='text-3xl font-serif font-bold mb-12 text-center'>Vermeil recommande</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{relatedArticles.map(article => (
							<Link
								key={article.id}
								href={`/article/${article.id}`}
								className='group'>
								<div className='relative aspect-[4/3] mb-4 overflow-hidden'>
									<Image
										src={article.imageUrl}
										alt={article.title}
										fill
										className='object-cover transition-transform duration-500 group-hover:scale-105'
									/>
								</div>
								<span className='inline-block text-sm font-medium uppercase tracking-wider text-gray-500 mb-2'>
									{article.category}
								</span>
								<h3 className='text-xl font-serif font-medium group-hover:text-gray-600 transition-colors'>
									{article.title}
								</h3>
							</Link>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}
