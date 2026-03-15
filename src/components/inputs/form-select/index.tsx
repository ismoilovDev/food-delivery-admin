import type { SelectHTMLAttributes } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { cn } from "~/lib/utils";

export interface SelectOption {
	value: string;
	label: string;
}

interface FormSelectProps<T extends FieldValues>
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "defaultValue"> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	options: SelectOption[];
	placeholder?: string;
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	options,
	placeholder,
	className,
	...rest
}: FormSelectProps<T>) {
	const selectId = label?.toLowerCase().replace(/\s+/g, "-");

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<div className="flex flex-col gap-1.5">
					{label && (
						<label htmlFor={selectId} className="text-sm font-medium text-gray-700">
							{label}
						</label>
					)}
					<select
						{...rest}
						{...field}
						id={selectId}
						value={field.value ?? ""}
						className={cn(
							"h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900",
							"outline-none transition-colors",
							"focus:border-orange-400 focus:ring-2 focus:ring-orange-100",
							"disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
							fieldState.error && "border-red-400 focus:border-red-400 focus:ring-red-100",
							className,
						)}
					>
						{placeholder && (
							<option value="" disabled>
								{placeholder}
							</option>
						)}
						{options.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
					{fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
				</div>
			)}
		/>
	);
}
