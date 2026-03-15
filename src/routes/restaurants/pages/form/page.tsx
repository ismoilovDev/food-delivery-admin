import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { RestaurantForm } from "./form";
import { useCreateAction, useEditAction } from "./useFormActions";
import { useFormPage } from "./usePage";
import { toFormDefaults } from "./utils";

export default function RestaurantFormPage() {
	const { isEdit, numId, restaurant, isLoading, goBack } = useFormPage();

	const createAction = useCreateAction(goBack);
	const editAction = useEditAction(numId, goBack);

	const isPending = isEdit ? editAction.isPending : createAction.isPending;
	const onSubmit = isEdit ? editAction.submit : createAction.submit;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-center gap-3">
				<Button type="button" variant="ghost" size="sm" onClick={goBack}>
					<ArrowLeft size={16} />
				</Button>
				<div>
					<h1 className="text-xl font-bold text-gray-900">
						{isEdit ? "Restoranni tahrirlash" : "Yangi restoran"}
					</h1>
					{isEdit && restaurant && (
						<p className="mt-0.5 text-sm text-gray-500">
							{restaurant.nameStr ?? restaurant.name?.uz}
						</p>
					)}
				</div>
			</div>

			{/* Form card */}
			<div className="w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
				{isEdit && isLoading ? (
					<div className="flex flex-col gap-5">
						{Array.from({ length: 5 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
							<div key={i} className="h-10 animate-pulse rounded-lg bg-gray-100" />
						))}
					</div>
				) : (
					<RestaurantForm
						defaultValues={isEdit && restaurant ? toFormDefaults(restaurant) : undefined}
						onSubmit={onSubmit}
						isPending={isPending}
					/>
				)}
			</div>
		</div>
	);
}
