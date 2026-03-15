import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormFileUploader, FormInput } from "~/components/inputs";
import { Button } from "~/components/ui/Button";
import { useAllCategories } from "~/lib/api/hooks/useCategories";
import { I18nField } from "./components/I18nField";
import { type CategoryFormData, categorySchema } from "./schema";

interface CategoryFormProps {
	defaultValues?: Partial<CategoryFormData>;
	onSubmit: (data: CategoryFormData) => void;
	isPending: boolean;
}

function ParentSelect({
	control,
}: {
	control: ReturnType<typeof useForm<CategoryFormData, unknown, CategoryFormData>>["control"];
}) {
	const { data: categories = [] } = useAllCategories();
	return (
		<Controller
			control={control}
			name="parentId"
			render={({ field }) => (
				<div className="flex flex-col gap-1.5">
					<label htmlFor="parentId-select" className="text-sm font-medium text-gray-700">
						Ota-kategoriya
					</label>
					<select
						id="parentId-select"
						value={field.value ?? ""}
						onChange={(e) =>
							field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
						}
						className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-colors"
					>
						<option value="">Ota-kategoriya yo'q</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name?.uz ?? cat.name?.ru ?? `#${cat.id}`}
							</option>
						))}
					</select>
				</div>
			)}
		/>
	);
}

export function CategoryForm({ defaultValues, onSubmit, isPending }: CategoryFormProps) {
	const { control, handleSubmit } = useForm<CategoryFormData, unknown, CategoryFormData>({
		resolver: zodResolver(categorySchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			<I18nField control={control} baseName="name" label="Nomi *" />
			<I18nField control={control} baseName="description" label="Tavsif (ixtiyoriy)" />

			<FormFileUploader control={control} name="imageUrl" label="Rasm" hint="PNG, JPG — 1:1" />

			<FormInput control={control} name="icon" label="Icon (emoji yoki nom)" />

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<FormInput
					control={control}
					name="orderIndex"
					label="Tartib raqami"
					type="number"
					placeholder="0"
				/>
				<ParentSelect control={control} />
			</div>

			{/* Mobile submit — hidden on xl (sidebar has button) */}
			<Button type="submit" loading={isPending} className="mt-1 xl:hidden">
				Saqlash
			</Button>
		</form>
	);
}
