'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z
	.object({
		firstName: z.string().min(1, { message: 'First name is required' }),
		lastName: z.string().min(1, { message: 'Last name is required' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
		passwordConfirmation: z.string().min(8, { message: 'Please confirm your password' }),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'],
	});

type FormValues = z.infer<typeof formSchema>;

export default function SignUp() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		},
	});

	const onSubmit = async (values: FormValues) => {
		await signUp.email({
			email: values.email,
			password: values.password,
			name: `${values.firstName} ${values.lastName}`,
			callbackURL: '/account/profile',
			fetchOptions: {
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: ctx => {
					setError(ctx.error.message);
					setLoading(false);
				},
				onSuccess: async () => {
					router.push('/account/profile');
				},
			},
		});
	};

	return (
		<Card className='z-50 rounded-md rounded-t-none max-w-md'>
			<CardHeader>
				<CardTitle className='text-lg md:text-xl'>Sign Up</CardTitle>
				<CardDescription className='text-xs md:text-sm'>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem className='grid gap-2'>
										<FormLabel htmlFor='first-name'>First name</FormLabel>
										<FormControl>
											<Input
												id='first-name'
												placeholder='Max'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem className='grid gap-2'>
										<FormLabel htmlFor='last-name'>Last name</FormLabel>
										<FormControl>
											<Input
												id='last-name'
												placeholder='Robinson'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem className='grid gap-2'>
									<FormLabel htmlFor='email'>Email</FormLabel>
									<FormControl>
										<Input
											id='email'
											type='email'
											placeholder='m@example.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem className='grid gap-2'>
									<FormLabel htmlFor='password'>Password</FormLabel>
									<FormControl>
										<Input
											id='password'
											type='password'
											autoComplete='new-password'
											placeholder='Password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='passwordConfirmation'
							render={({ field }) => (
								<FormItem className='grid gap-2'>
									<FormLabel htmlFor='password-confirmation'>Confirm Password</FormLabel>
									<FormControl>
										<Input
											id='password-confirmation'
											type='password'
											autoComplete='new-password'
											placeholder='Confirm Password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='w-full'
							disabled={loading}>
							{loading ? (
								<Loader2
									size={16}
									className='animate-spin'
								/>
							) : (
								'Create an account'
							)}
						</Button>
						{error && <p className='text-red-500'>{error}</p>}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
