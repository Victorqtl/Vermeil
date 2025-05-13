import React from 'react';
import { Category } from '../../../types/types';
import { ArrowRight } from 'lucide-react';

interface CategoriesProps {
	categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
	return (
		<section className='bg-gray-50 py-16 md:py-24'>
			<div className='container mx-auto px-4 md:px-6'>
				<h2 className='text-3xl md:text-4xl font-serif font-bold mb-4 text-center'>Explorez nos univers</h2>
				<p className='text-gray-600 text-center max-w-2xl mx-auto mb-12'>
					Découvrez du contenu inspirant dans chacune de nos thématiques dédiées à l'homme moderne.
				</p>

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
								<h3 className='text-2xl md:text-3xl font-serif font-bold text-white mb-2'>
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
};

export default Categories;
