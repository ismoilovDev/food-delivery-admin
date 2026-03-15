import type { Control } from "react-hook-form";
import { FormInput } from "~/components/inputs";
import type { CategoryFormData } from "../schema";

interface I18nFieldProps {
	control: Control<CategoryFormData>;
	baseName: "name" | "description";
	label: string;
}

export function I18nField({ control, baseName, label }: I18nFieldProps) {
	return (
		<div>
			<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
			<div className="flex flex-col gap-2">
				<FormInput control={control} name={`${baseName}.uz`} label="O'zbekcha" />
				<FormInput control={control} name={`${baseName}.ru`} label="Ruscha" />
				<FormInput control={control} name={`${baseName}.en`} label="Inglizcha" />
			</div>
		</div>
	);
}
