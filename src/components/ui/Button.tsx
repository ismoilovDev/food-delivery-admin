import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

export const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
		"disabled:cursor-not-allowed disabled:opacity-50",
	],
	{
		variants: {
			variant: {
				primary: "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-400",
				secondary:
					"border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400",
				ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400",
				danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400",
			},
			size: {
				sm: "h-8 px-3 text-xs",
				md: "h-10 px-4 text-sm",
				lg: "h-11 px-6 text-base",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant, size, loading = false, className, children, disabled, ...props }, ref) => {
		return (
			<button
				ref={ref}
				disabled={disabled ?? loading}
				className={cn(buttonVariants({ variant, size }), className)}
				{...props}
			>
				{loading && (
					<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
				)}
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
