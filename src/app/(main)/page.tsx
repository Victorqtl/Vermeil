import Hero from '../../components/sections/home/Hero';
import Categories from '../../components/sections/home/Categories';
import FeaturedArticles from '../../components/sections/home/FeaturedArticles';
import Newsletter from '../../components/sections/home/Newsletter';
import { articles, categories } from '../../data/articles';

export default function Home() {
	return (
		<div>
			<Hero />
			<FeaturedArticles articles={articles} />
			<Categories categories={categories} />
			<Newsletter />
		</div>
	);
}
