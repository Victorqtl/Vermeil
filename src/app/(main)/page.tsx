import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedArticles from './components/FeaturedArticles';
// import Newsletter from './components/Newsletter';

export default function Home() {
	return (
		<div>
			<Hero />
			<FeaturedArticles />
			<Categories />
			{/* <Newsletter /> */}
		</div>
	);
}
