import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
			<head>
				{/* Google Tag Manager */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-PBCGC2PQ');`,
					}}
				/>
				{/* End Google Tag Manager */}
			</head>
			<body className={`min-h-screen flex flex-col justify-between font-sans text-gray-900 ${inter.className}`}>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe 
						src="https://www.googletagmanager.com/ns.html?id=GTM-PBCGC2PQ"
						height="0" 
						width="0" 
						style={{display:'none',visibility:'hidden'}}
					/>
				</noscript>
				{/* End Google Tag Manager (noscript) */}
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
