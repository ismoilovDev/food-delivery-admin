import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormFileUploader, FormInput } from "~/components/inputs";
import { Button } from "~/components/ui/button";
import { useAllCategories } from "~/lib/api/hooks/useCategories";
import { I18nField } from "./components/i18nField";
import { type ProductFormData, productSchema } from "./schema";

interface ProductFormProps {
	defaultValues?: Partial<ProductFormData>;
	onSubmit: (data: ProductFormData) => void;
	isPending: boolean;
}

function CategorySelect({
	control,
}: {
	control: ReturnType<typeof useForm<ProductFormData, unknown, ProductFormData>>["control"];
}) {
	const { data: categories = [] } = useAllCategories();
	return (
		<Controller
			control={control}
			name="categoryId"
			render={({ field, fieldState }) => (
				<div className="flex flex-col gap-1.5">
					<label htmlFor="categoryId-select" className="text-sm font-medium text-gray-700">
						Kategoriya *
					</label>
					<select
						id="categoryId-select"
						value={field.value ?? ""}
						onChange={(e) =>
							field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
						}
						className="h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-colors"
					>
						<option value="">Kategoriya tanlang</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name?.uz ?? cat.name?.ru ?? `#${cat.id}`}
							</option>
						))}
					</select>
					{fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
				</div>
			)}
		/>
	);
}

export function ProductForm({ defaultValues, onSubmit, isPending }: ProductFormProps) {
	const { control, handleSubmit, watch } = useForm<ProductFormData, unknown, ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues,
	});

	const isSpicy = watch("isSpicy");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			{/* Name */}
			<I18nField control={control} baseName="name" label="Nomi *" />

			{/* Description */}
			<I18nField control={control} baseName="description" label="Tavsif (ixtiyoriy)" />

			{/* Main image */}
			<FormFileUploader
				control={control}
				name="mainImageUrl"
				label="Asosiy rasm"
				hint="PNG, JPG — 1:1"
			/>

			{/* Category + Restaurant */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<CategorySelect control={control} />
				<FormInput
					control={control}
					name="restaurantId"
					label="Restoran ID"
					type="number"
					placeholder=""
				/>
			</div>

			{/* Price */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<FormInput
					control={control}
					name="price"
					type="number"
					label="Narx (so'm) *"
					placeholder="0"
				/>
				<FormInput
					control={control}
					name="discountPrice"
					type="number"
					label="Chegirma narxi"
					placeholder=""
				/>
				<FormInput
					control={control}
					name="discountPercentage"
					type="number"
					label="Chegirma (%)"
					placeholder=""
				/>
			</div>

			{/* Stock */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<FormInput
					control={control}
					name="stockQuantity"
					type="number"
					label="Zaxira"
					placeholder=""
				/>
				<FormInput
					control={control}
					name="minOrderQuantity"
					type="number"
					label="Min buyurtma"
					placeholder=""
				/>
				<FormInput
					control={control}
					name="maxOrderQuantity"
					type="number"
					label="Maks buyurtma"
					placeholder=""
				/>
			</div>

			{/* Details */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<FormInput
					control={control}
					name="preparationTime"
					type="number"
					label="Tayyorlash (min)"
					placeholder=""
				/>
				<FormInput
					control={control}
					name="calories"
					type="number"
					label="Kaloriya"
					placeholder=""
				/>
				<FormInput
					control={control}
					name="weight"
					type="number"
					label="Og'irlik (g)"
					placeholder=""
				/>
			</div>

			{/* Checkboxes */}
			<div className="flex flex-wrap gap-4">
				<Controller
					control={control}
					name="isVegetarian"
					render={({ field }) => (
						<label className="flex cursor-pointer items-center gap-2">
							<input
								type="checkbox"
								checked={field.value ?? false}
								onChange={(e) => field.onChange(e.target.checked)}
								className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
							/>
							<span className="text-sm text-gray-700">Vegetarian</span>
						</label>
					)}
				/>
				<Controller
					control={control}
					name="isSpicy"
					render={({ field }) => (
						<label className="flex cursor-pointer items-center gap-2">
							<input
								type="checkbox"
								checked={field.value ?? false}
								onChange={(e) => field.onChange(e.target.checked)}
								className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
							/>
							<span className="text-sm text-gray-700">Achchiq</span>
						</label>
					)}
				/>
				{isSpicy && (
					<FormInput
						control={control}
						name="spicyLevel"
						type="number"
						label="Achchiqlik darajasi (0-5)"
						placeholder="0"
					/>
				)}
			</div>

			{/* Mobile submit — hidden on xl (sidebar has button) */}
			<Button type="submit" loading={isPending} className="mt-1 xl:hidden">
				Saqlash
			</Button>
		</form>
	);
}
