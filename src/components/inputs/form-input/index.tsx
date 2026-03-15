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
	type,
	...rest
}: FormInputProps<T>) {
	const isNumber = type === "number";

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Input
					{...rest}
					type={type}
					label={label}
					value={field.value ?? ""}
					onChange={(e) => {
						if (isNumber) {
							const n = e.target.valueAsNumber;
							field.onChange(Number.isNaN(n) ? undefined : n);
						} else {
							field.onChange(e);
						}
					}}
					onBlur={field.onBlur}
					ref={field.ref}
					name={field.name}
					error={fieldState.error?.message}
				/>
			)}
		/>
	);
}
