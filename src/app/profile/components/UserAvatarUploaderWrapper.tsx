import { getUser } from '@/lib/auth-session';
import { UserAvatarUploader } from '@/app/profile/components/ui/user-avatar-uploader';

export default async function UserAvatarUploaderWrapper() {
	const user = await getUser();

	if (!user) {
		return null;
	}

	return <UserAvatarUploader user={user} />;
}
