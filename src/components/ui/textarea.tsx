import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "~/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, error, className, id, ...props }, ref) => {
		const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
						{label}
					</label>
				)}
				<textarea
					ref={ref}
					id={textareaId}
					className={cn(
						"min-h-20 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900",
						"placeholder:text-gray-400",
						"outline-none transition-colors resize-none",
						"focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
						"disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
						error && "border-red-400 focus:border-red-400 focus:ring-red-100",
						className,
					)}
					{...props}
				/>
				{error && <p className="text-xs text-red-500">{error}</p>}
			</div>
		);
	},
);

Textarea.displayName = "Textarea";
