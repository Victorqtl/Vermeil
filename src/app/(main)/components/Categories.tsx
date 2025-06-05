import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
	{
		id: 'mode',
		name: 'Mode',
		description: 'Tendances, conseils et inspirations pour affirmer votre style',
		imageUrl:
			'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		slug: 'mode',
	},
	{
		id: 'soins',
		name: 'Soins',
		description: 'Produits et rituels pour prendre soin de vous au quotidien',
		imageUrl:
			'https://images.unsplash.com/photo-1715702129041-ff31d547e498?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		slug: 'soins',
	},
	{
		id: 'lifestyle',
		name: 'Lifestyle',
		description: 'Art de vivre, déco et bien-être pour un quotidien raffiné',
		imageUrl:
			'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		slug: 'lifestyle',
	},
	{
		id: 'culture',
		name: 'Culture',
		description: 'Livres, films, musique et événements qui façonnent notre époque',
		imageUrl:
			'https://images.pexels.com/photos/922100/pexels-photo-922100.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		slug: 'culture',
	},
];

export default function Categories() {
	return (
		<section className='bg-gray-50 py-16 md:py-24'>
			<div className='container mx-auto px-4 md:px-6'>
				<h2 className='text-3xl md:text-4xl font-serif font-bold mb-4 text-center uppercase'>
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
