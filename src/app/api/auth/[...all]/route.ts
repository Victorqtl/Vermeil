import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

console.log('Auth handler called');
console.log('Environment variables check:', {
	hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
	hasAuthSecret: !!process.env.BETTER_AUTH_SECRET,
	hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
	hasDatabaseUrl: !!process.env.DATABASE_URL,
});

export const { POST, GET } = toNextJsHandler(auth);
