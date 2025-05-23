import { isAdmin } from '@/lib/auth-session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	await isAdmin();
	return (
		<section className='font-sans text-gray-900 bg-gray-50 min-h-screen'>
			<div className='py-8'>{children}</div>
		</section>
	);
}
