export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className='font-sans text-gray-900 bg-gray-50 min-h-screen'>
			<div className='py-8'>{children}</div>
		</section>
	);
}
