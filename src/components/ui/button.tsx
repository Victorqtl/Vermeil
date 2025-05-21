import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
	{
		variants: {
			variant: {
				default: 'bg-white text-black shadow-xs hover:bg-gray-100 group',
				primary: 'bg-black text-white shadow-xs hover:bg-black/90 group',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border border-gray-200 bg-transparent shadow-xs hover:bg-gray-50 hover:text-gray-900 dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary: 'bg-gray-100 text-gray-900 shadow-xs hover:bg-gray-200',
				ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-accent/50',
				link: 'text-black font-medium hover:underline underline-offset-4',
				arrow: 'bg-white px-6 py-3 rounded-none font-medium hover:bg-gray-100 transition-colors group [&_svg]:ml-2 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg.lucide-arrow-right]:group-hover:translate-x-1',
			},
			size: {
				default: 'h-10 px-5 py-2.5 has-[>svg]:px-4',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-12 px-8 py-3 has-[>svg]:px-6 rounded-none',
				icon: 'size-9',
			},
			rounded: {
				default: 'rounded-md',
				none: 'rounded-none',
				full: 'rounded-full',
			},
		},
		defaultVariants: {
			variant: 'arrow',
			size: 'default',
			rounded: 'none',
		},
	}
);

function Button({
	className,
	variant,
	size,
	rounded,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, rounded, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
