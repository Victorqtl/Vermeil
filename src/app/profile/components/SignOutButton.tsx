'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push('/');
		router.refresh();
	};

	return (
		<Button
			onClick={handleSignOut}
			variant='outlined'>
			<LogOut
				className='group'
				size={18}
			/>
			Déconnexion
		</Button>
	);
}