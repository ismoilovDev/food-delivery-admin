import type { InputHTMLAttributes } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Input } from "~/components/ui/Input";

interface FormInputProps<T extends FieldValues>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
}

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	...rest
}: FormInputProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Input
					{...rest}
					{...field}
					label={label}
					value={field.value ?? ""}
					error={fieldState.error?.message}
				/>
			)}
		/>
	);
}
