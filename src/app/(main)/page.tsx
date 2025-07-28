import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedArticles from './components/FeaturedArticles';

export default function Home() {
	return (
		<div>
			<Hero />
			<FeaturedArticles />
			<Categories />
		</div>
	);
}
