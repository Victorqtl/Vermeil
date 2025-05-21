import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// import { PrismaClient } from '@/app/generated/prisma';
import { prisma } from '@/lib/prisma';
// import { resend } from './resend';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		// async sendResetPassword(data) {
		// 	await resend.emails.send({
		// 		from: 'vermeil.services@gmail.com',
		// 		to: data.user.email,
		// 		subject: 'Reset your password',
		// 		text: `Rest password : ${data.url}`,
		// 	});
		// },
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
});
