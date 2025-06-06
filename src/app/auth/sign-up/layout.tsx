// import { getUser } from '@/lib/auth-session';
// import { unauthorized } from 'next/navigation';

export default async function SignUpLayout({ children }: { children: React.ReactNode }) {
	// const session = await getUser();
	// const admin = session?.role === 'admin';

	// if (!admin) {
	// 	unauthorized();
	// }
	return <div>{children}</div>;
}
