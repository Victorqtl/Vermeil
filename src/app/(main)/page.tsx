import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedArticles from './components/FeaturedArticles';
import Newsletter from './components/Newsletter';
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
