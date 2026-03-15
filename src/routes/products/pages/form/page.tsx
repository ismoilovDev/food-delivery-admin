import { ArrowLeft, Clock, DollarSign, Image, Leaf, Package, Tag } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ProductForm } from "./form";
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
		icon: Tag,
		title: "Nom (I18n)",
		desc: "O'zbekcha nom majburiy.",
	},
	{
		icon: Image,
		title: "Rasm",
		desc: "Asosiy rasm kvadrat formatda (500×500px) tavsiya etiladi.",
	},
	{
		icon: DollarSign,
		title: "Narx",
		desc: "Asosiy narx majburiy. Chegirma narxi yoki foizi ixtiyoriy.",
	},
	{
		icon: Package,
		title: "Zaxira",
		desc: "Mahsulot zaxirasi, minimal va maksimal buyurtma miqdori.",
	},
	{
		icon: Clock,
		title: "Tayyorlash",
		desc: "Tayyorlash vaqti (daqiqa), kaloriya va og'irlik (gram).",
	},
	{
		icon: Leaf,
		title: "Tarkib",
		desc: "Vegetarian, achchiq darajasi belgilang.",
	},
];

export default function ProductFormPage() {
	const { isEdit, numId, product, isLoading, goBack } = useFormPage();

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
						{isEdit ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
					</h1>
					<p className="text-sm text-gray-400">
						{isEdit && product
							? (product.name?.uz ?? product.name?.ru)
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
							<ProductForm
								defaultValues={isEdit && product ? toFormDefaults(product) : undefined}
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
							{isEdit ? "O'zgarishlarni saqlash" : "Mahsulot qo'shish"}
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
