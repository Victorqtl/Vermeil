import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/data/articles';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
	const articles = await getArticles();
	const resolvedParams = await params;
	const article = articles.find(article => resolvedParams.slug === article.slug);

	return (
		<article className='min-h-screen bg-white'>
			{/* Hero Section */}
			<div className='relative h-[60vh] min-h-[500px] w-full'>
				<Image
					src={article!.heroImage}
					alt={article!.title}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-black/40' />
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='container mx-auto px-4 md:px-6 text-center'>
						<span className='inline-block bg-white px-4 py-2 mb-4 text-sm font-medium text-black uppercase tracking-wider'>
							{article!.category}
						</span>
						<h1 className='text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl mx-auto leading-tight'>
							{article!.title}
						</h1>
						<div className='mt-6 text-white/90'>
							<span>{article!.createdAt.toLocaleDateString('fr-FR')}</span>
							<span className='mx-3'>•</span>
							<span>{article!.readTime} min de lecture</span>
						</div>
					</div>
				</div>
			</div>

			{/* Products Section */}
			<div className='container mx-auto px-4 md:px-6 py-16'>
				<div className='max-w-3xl mx-auto'>
					{article!.sections.map((section, index) => (
						<div
							key={section.id}
							className='mb-16'>
							<Link
								href={`${section.link}`}
								className='group block relative aspect-[16/9] mb-6 overflow-hidden'>
								<Image
									src={section.image}
									alt={section.name}
									fill
									className='object-cover transition-transform duration-500 group-hover:scale-105'
								/>
							</Link>
							<h2 className='text-2xl md:text-3xl font-serif font-bold mb-4'>
								{`${index + 1}. ${section.name}`}
							</h2>
							<p className='text-gray-600 leading-relaxed mb-6'>{section.description}</p>
							<Link
								href={`${section.link}`}
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

			{/* Related Articles Section
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
			</div> */}
		</article>
	);
}
