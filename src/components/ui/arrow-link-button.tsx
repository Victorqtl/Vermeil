import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ArrowLinkButton = ({
	href,
	text,
	variant = 'default',
}: {
	href: string;
	text: string;
	variant?: 'default' | 'bordered';
}) => {
	return (
		<Link
			href={href}
			className={`inline-flex items-center bg-white px-6 py-3 rounded-none font-medium hover:bg-gray-100 transition-colors group ${
				variant === 'bordered' ? 'border border-gray-200' : ''
			}`}>
			{text}
			<ArrowRight
				size={18}
				className='ml-2 transition-transform duration-300 group-hover:translate-x-1'
			/>
		</Link>
	);
};

export default ArrowLinkButton;
