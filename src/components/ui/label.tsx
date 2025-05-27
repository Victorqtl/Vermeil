'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva(
	'text-sm font-medium text-gray-700 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
	{
		variants: {
			variant: {},
		},
	}
);

export interface LabelProps
	extends React.ComponentProps<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {}

function Label({ className, variant, ...props }: LabelProps) {
	return (
		<LabelPrimitive.Root
			data-slot='label'
			className={cn(labelVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Label };
