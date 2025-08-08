import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Vermeil | Inspirer l'élégance masculine",
	description:
		'Vermeil propose aux hommes des conseils raffinés en mode, soins, lifestyle et culture. Articles experts pour cultiver un art de vivre exigeant.',
	icons: {
		icon: '/vermeil.png',
		shortcut: '/vermeil.png',
		apple: '/vermeil.png',
	},
	openGraph: {
		title: "Vermeil | Inspirer l'élégance masculine",
		description:
			'Vermeil propose aux hommes des conseils raffinés en mode, soins, lifestyle et culture. Articles experts pour cultiver un art de vivre exigeant.',
		images: ['/vermeil.png'],
	},
	twitter: {
		card: 'summary_large_image',
		title: "Vermeil | Inspirer l'élégance masculine",
		description:
			'Vermeil propose aux hommes des conseils raffinés en mode, soins, lifestyle et culture. Articles experts pour cultiver un art de vivre exigeant.',
		images: ['/vermeil.png'],
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='fr'>
			<body className={`min-h-screen flex flex-col justify-between font-sans text-gray-900 ${inter.className}`}>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-G31JH48C4J" />
				<Script id="google-analytics">
					{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-G31JH48C4J');
					`}
				</Script>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
