import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ArrowLinkButton = ({
	type,
	href,
	text,
	variant = 'default',
}: {
	type?: 'button' | 'link';
	href: string;
	text: string;
	variant?: 'default' | 'bordered' | 'gray';
}) => {
	// Définir les classes selon la variant
	const getVariantClasses = () => {
		switch (variant) {
			case 'gray':
				return 'bg-gray-900 text-white hover:bg-gray-800';
			case 'bordered':
				return 'bg-white border border-gray-200 hover:bg-gray-100';
			default:
				return 'bg-white hover:bg-gray-100';
		}
	};

	return (
		<Link
			type={type}
			href={href}
			className={`inline-flex items-center px-6 h-14 rounded-none font-medium transition-colors group ${getVariantClasses()}`}>
			{text}
			<ArrowRight
				size={18}
				className='ml-2 transition-transform duration-300 group-hover:translate-x-1'
			/>
		</Link>
	);
};

export default ArrowLinkButton;
