import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, leftIcon, rightIcon, className, id, ...props }, ref) => {
		const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={inputId} className="text-sm font-medium text-gray-700">
						{label}
					</label>
				)}
				<div className="relative">
					{leftIcon && (
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							{leftIcon}
						</span>
					)}
					<input
						ref={ref}
						id={inputId}
						className={cn(
							"h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900",
							"placeholder:text-gray-400",
							"outline-none transition-colors",
							"focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
							"disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
							error && "border-red-400 focus:border-red-400 focus:ring-red-100",
							leftIcon && "pl-9",
							rightIcon && "pr-9",
							className,
						)}
						{...props}
					/>
					{rightIcon && (
						<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
							{rightIcon}
						</span>
					)}
				</div>
				{error && <p className="text-xs text-red-500">{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";
