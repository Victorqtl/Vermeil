import { getUser } from '@/lib/auth-session';
import UserProfile from './UserProfile';

export default async function UserProfileWrapper() {
	const user = await getUser();

	if (!user) {
		return null;
	}

	return <UserProfile user={user} />;
}