import { cn } from "~/lib/utils";

interface ToggleProps {
	checked: boolean;
	onChange?: () => void;
	disabled?: boolean;
	loading?: boolean;
}

export function Toggle({ checked, onChange, disabled, loading }: ToggleProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			disabled={disabled || loading}
			onClick={onChange}
			className={cn(
				"relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				checked ? "bg-orange-500" : "bg-gray-200",
			)}
		>
			<span
				className={cn(
					"inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
					checked ? "translate-x-4" : "translate-x-0.5",
					loading && "animate-pulse",
				)}
			/>
		</button>
	);
}
