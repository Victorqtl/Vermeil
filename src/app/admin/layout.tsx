import { getUser } from '@/lib/auth-session';
import { unauthorized } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const session = await getUser();
	const admin = session?.role === 'admin';

	if (!admin) {
		unauthorized();
	}
	return (
		<section className='font-sans text-gray-900 bg-gray-50 min-h-screen'>
			<div className='py-8'>{children}</div>
		</section>
	);
}
