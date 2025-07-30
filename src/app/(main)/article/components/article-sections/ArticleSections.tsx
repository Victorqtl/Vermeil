import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCachedArticleSections } from '@/lib/data/articles';

function parseBoldText(text: string) {
	return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
}

function renderParagraph(text: string, index: number) {
	const parsedText = parseBoldText(text);

	return (
		<p
			key={index}
			className={index > 0 ? 'mt-4' : ''}
			dangerouslySetInnerHTML={{ __html: parsedText }}
		/>
	);
}

interface ArticleSectionsProps {
	slug: string;
	articleDescription: string;
}

export default async function ArticleSections({ slug, articleDescription }: ArticleSectionsProps) {
	const sections = await getCachedArticleSections(slug)();

	return (
		<div className='max-w-3xl mx-auto'>
			<div className='text-gray-900 text-lg leading-relaxed mb-6'>
				{articleDescription.split('\n').map((paragraph, index) => renderParagraph(paragraph, index))}
			</div>
			{sections.map(section => {
				return (
					<div
						key={section.id}
						className='mt-16'>
						<h2 className='text-2xl md:text-3xl font-serif font-bold mb-4'>{section.name}</h2>
						<div className='text-gray-900 text-lg leading-relaxed mb-6'>
							{section.description
								.split('\n')
								.map((paragraph, index) => renderParagraph(paragraph, index))}
						</div>
						{section.image && section.link ? (
							<Link
								href={section.link}
								className='group block relative aspect-[16/9] mb-6 overflow-hidden'>
								<Image
									src={section.image}
									alt={section.imageAlt!}
									fill
									loading='lazy'
									className='object-cover bg-gray-200 transition-transform duration-500 group-hover:scale-105'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							</Link>
						) : (
							section.image && (
								<div className='group block relative aspect-[16/9] mb-6 overflow-hidden'>
									<Image
										src={section.image}
										alt={section.imageAlt!}
										fill
										loading='lazy'
										className='object-cover bg-gray-200'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>
								</div>
							)
						)}
						{section.link && (
							<Link
								href={section.link}
								className='inline-flex items-center bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors group'>
								Voir le produit
								<ArrowRight
									size={18}
									className='ml-2 transition-transform group-hover:translate-x-1'
								/>
							</Link>
						)}
					</div>
				);
			})}
		</div>
	);
}