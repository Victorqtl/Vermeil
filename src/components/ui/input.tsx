import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
	'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 bg-transparent text-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
	{
		variants: {
			variant: {
				underline: [
					'mt-1 border-0 border-b border-gray-200 shadow-none p-2',
					'focus-visible:border-gray-900',
					'aria-invalid:border-red-500 aria-invalid:focus-visible:border-red-500 aria-invalid:focus-visible:ring-red-500/20',
				],
				admin: [
					'mt-1 p-2 border border-gray-200 shadow-none',
					'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent focus-visible:outline-none',
					'aria-invalid:border-red-500',
				],
			},
		},
		defaultVariants: {
			variant: 'underline',
		},
	}
);

export interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, variant, type, ...props }: InputProps) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(inputVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Input };
