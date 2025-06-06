import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Vermeil | Inspirer l'élégance masculine",
	description:
		'Vermeil propose aux hommes des conseils raffinés en mode, soins, lifestyle et culture. Articles experts pour cultiver un art de vivre exigeant.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='fr'>
			<body className={`flex flex-col min-h-screen font-sans text-gray-900 ${inter.className}`}>{children}</body>
		</html>
	);
}
