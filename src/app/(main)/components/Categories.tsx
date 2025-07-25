import React from 'react';
import { ArrowRight } from 'lucide-react';
import ModeImage from '@/assets/images/mode-categorie-image.jpeg';
import SoinsImage from '@/assets/images/soins-categorie-image.jpeg';
import LifestyleImage from '@/assets/images/lifestyle-categorie-image.jpeg';
import CultureImage from '@/assets/images/culture-categorie-image.jpeg';

const categories = [
	{
		id: 'mode',
		name: 'Mode',
		description: 'Tendances, conseils et inspirations pour affirmer votre style',
		imageUrl: ModeImage.src,
		slug: 'mode',
	},
	{
		id: 'soins',
		name: 'Soins',
		description: 'Produits et rituels pour prendre soin de vous au quotidien',
		imageUrl: SoinsImage.src,
		slug: 'soins',
	},
	{
		id: 'lifestyle',
		name: 'Lifestyle',
		description: 'Art de vivre, déco et bien-être pour un quotidien raffiné',
		imageUrl: LifestyleImage.src,
		slug: 'lifestyle',
	},
	{
		id: 'culture',
		name: 'Culture',
		description: 'Livres, films, musique et événements qui façonnent notre époque',
		imageUrl: CultureImage.src,
		slug: 'culture',
	},
];

export default function Categories() {
	return (
		<section className='bg-gray-50 py-16 md:py-24'>
			<div className='container mx-auto px-4 md:px-6'>
				<h2 className='text-3xl md:text-4xl font-serif font-bold mb-12 text-center uppercase'>
					Explorez nos univers
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{categories.map((category, index) => (
						<a
							key={category.id}
							href={`/${category.slug}`}
							className='relative overflow-hidden group h-64 md:h-80'>
							<div
								className={`absolute inset-0 bg-cover ${
									index === 3 ? 'bg-bottom' : 'bg-center'
								}  transform transition-transform duration-700 group-hover:scale-105`}
								style={{ backgroundImage: `url(${category.imageUrl})` }}
							/>
							<div className='absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-300'></div>

							<div className='absolute inset-0 flex flex-col justify-end p-6 md:p-8'>
								<h3 className='text-2xl md:text-3xl font-serif font-bold text-white mb-2 uppercase'>
									{category.name}
								</h3>
								<p className='text-white/90 mb-4 max-w-xs'>{category.description}</p>
								<div className='flex items-center text-white font-medium group/link'>
									<span>Explorer</span>
									<ArrowRight
										size={18}
										className='ml-2 transition-transform duration-300 group-hover/link:translate-x-1'
									/>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
