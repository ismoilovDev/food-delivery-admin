import type { TextareaHTMLAttributes } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Textarea } from "~/components/ui/Textarea";

interface FormTextareaProps<T extends FieldValues>
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "defaultValue"> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
}

export function FormTextarea<T extends FieldValues>({
	control,
	name,
	label,
	...rest
}: FormTextareaProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Textarea
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
