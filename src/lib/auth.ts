import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import { resend } from './resend';

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(data) {
			await resend.emails.send({
				from: 'vermeil.services@gmail.com',
				to: data.user.email,
				subject: 'Reset your password',
				text: `Reset password : ${data.url}`,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	plugins: [nextCookies(), admin()],
	user: {
		additionalFields: {
			image: {
				type: 'string',
				defaultValue:
					'https://media.istockphoto.com/id/1194657244/vector/business-man-icon-male-face-silhouette-with-office-suit-and-tie-user-avatar-profile-vector.jpg?s=612x612&w=0&k=20&c=D-8JhQ1SF0ju-3QPAEsnXzutbaJtWicunTGMCmFLFmg=',
			},
		},
	},
});
