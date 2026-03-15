import { ArrowLeft, Clock, DollarSign, Image, Info, MapPin, Phone } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { RestaurantForm } from "./form";
import { useCreateAction, useEditAction } from "./useFormActions";
import { useFormPage } from "./usePage";
import { toFormDefaults } from "./utils";

function FormSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: 7 }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
				<div key={i} className="h-10 animate-pulse rounded-xl bg-gray-100" />
			))}
		</div>
	);
}

const INFO_CARDS = [
	{
		icon: Info,
		title: "Nom (I18n)",
		desc: "O'zbekcha, Ruscha va Inglizcha nomlarni kiriting. Kamida bittasi majburiy.",
	},
	{
		icon: Image,
		title: "Logo & Banner",
		desc: "Logo — kvadrat, 200×200px yoki katta. Banner — keng format, 1200×400px tavsiya etiladi.",
	},
	{
		icon: Phone,
		title: "Aloqa",
		desc: "Telefon raqami xalqaro formatda (+998...). Email ixtiyoriy.",
	},
	{
		icon: Clock,
		title: "Ish vaqti",
		desc: "Restoran ish boshlash va tugash vaqtini kiriting.",
	},
	{
		icon: MapPin,
		title: "Manzil",
		desc: "O'zbekcha, Ruscha va Inglizcha manzillarni kiriting.",
	},
	{
		icon: DollarSign,
		title: "Narxlar",
		desc: "Yetkazib berish narxi, minimal buyurtma va o'rtacha yetkazib berish vaqti (daqiqa).",
	},
];

export default function RestaurantFormPage() {
	const { isEdit, numId, restaurant, isLoading, goBack } = useFormPage();

	const createAction = useCreateAction(goBack);
	const editAction = useEditAction(numId, goBack);

	const isPending = isEdit ? editAction.isPending : createAction.isPending;
	const onSubmit = isEdit ? editAction.submit : createAction.submit;

	return (
		<div className="flex flex-col gap-6">
			{/* Page header */}
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={goBack}
					className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-orange-300 hover:text-orange-500"
				>
					<ArrowLeft size={16} />
				</button>
				<div>
					<h1 className="text-lg font-bold text-gray-900">
						{isEdit ? "Restoranni tahrirlash" : "Yangi restoran qo'shish"}
					</h1>
					<p className="text-sm text-gray-400">
						{isEdit && restaurant
							? (restaurant.nameStr ?? restaurant.name?.uz)
							: "Barcha kerakli ma'lumotlarni to'ldiring"}
					</p>
				</div>
			</div>

			{/* Two-column layout on large screens */}
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				{/* Form card — 2/3 width */}
				<div className="xl:col-span-2">
					<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
						{isEdit && isLoading ? (
							<FormSkeleton />
						) : (
							<RestaurantForm
								defaultValues={isEdit && restaurant ? toFormDefaults(restaurant) : undefined}
								onSubmit={onSubmit}
								isPending={isPending}
							/>
						)}
					</div>
				</div>

				{/* Info sidebar — 1/3 width */}
				<div className="flex flex-col gap-4">
					{INFO_CARDS.map(({ icon: Icon, title, desc }) => (
						<div
							key={title}
							className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
						>
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
								<Icon size={15} />
							</div>
							<div>
								<p className="text-sm font-semibold text-gray-800">{title}</p>
								<p className="mt-0.5 text-xs leading-relaxed text-gray-500">{desc}</p>
							</div>
						</div>
					))}

					{/* Actions on sidebar for desktop */}
					<div className="hidden xl:flex xl:flex-col xl:gap-2">
						<Button
							type="button"
							onClick={() => {
								const form = document.querySelector("form");
								form?.requestSubmit();
							}}
							loading={isPending}
							className="w-full"
						>
							{isEdit ? "O'zgarishlarni saqlash" : "Restoran qo'shish"}
						</Button>
						<Button type="button" variant="secondary" onClick={goBack} className="w-full">
							Bekor qilish
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
