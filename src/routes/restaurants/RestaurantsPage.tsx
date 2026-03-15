import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Edit2, Plus, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Modal } from "~/components/ui/Modal";
import { Toggle } from "~/components/ui/Toggle";
import {
	useCreateRestaurant,
	useDeleteRestaurant,
	useRestaurants,
	useToggleRestaurantActive,
	useToggleRestaurantOpen,
	useUpdateRestaurant,
} from "~/lib/api/hooks/useRestaurants";
import type { RestaurantDto } from "~/lib/api/services/restaurants";

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const i18nSchema = z.object({
	uz: z.string().optional(),
	ru: z.string().optional(),
	en: z.string().optional(),
});

const restaurantSchema = z.object({
	name: i18nSchema,
	description: i18nSchema.optional(),
	address: i18nSchema.optional(),
	phone: z.string().optional(),
	email: z.string().email("Noto'g'ri email").optional().or(z.literal("")),
	logoUrl: z.string().url("Noto'g'ri URL").optional().or(z.literal("")),
	bannerUrl: z.string().url("Noto'g'ri URL").optional().or(z.literal("")),
	workingHoursStart: z.string().optional(),
	workingHoursEnd: z.string().optional(),
	deliveryFee: z.coerce.number().min(0).optional(),
	minOrderAmount: z.coerce.number().min(0).optional(),
	averageDeliveryTime: z.coerce.number().min(0).optional(),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

// ─── Form Component ───────────────────────────────────────────────────────────

function RestaurantForm({
	defaultValues,
	onSubmit,
	loading,
}: {
	defaultValues?: Partial<RestaurantFormData>;
	onSubmit: (data: RestaurantFormData) => void;
	loading: boolean;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RestaurantFormData>({
		resolver: zodResolver(restaurantSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			{/* Name i18n */}
			<div>
				<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Nomi</p>
				<div className="flex flex-col gap-2">
					<Input label="O'zbekcha" {...register("name.uz")} error={errors.name?.uz?.message} />
					<Input label="Ruscha" {...register("name.ru")} error={errors.name?.ru?.message} />
					<Input label="Inglizcha" {...register("name.en")} error={errors.name?.en?.message} />
				</div>
			</div>

			{/* Description i18n */}
			<div>
				<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
					Tavsif (ixtiyoriy)
				</p>
				<div className="flex flex-col gap-2">
					<Input label="O'zbekcha" {...register("description.uz")} />
					<Input label="Ruscha" {...register("description.ru")} />
					<Input label="Inglizcha" {...register("description.en")} />
				</div>
			</div>

			{/* Address i18n */}
			<div>
				<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
					Manzil (ixtiyoriy)
				</p>
				<div className="flex flex-col gap-2">
					<Input label="O'zbekcha" {...register("address.uz")} />
					<Input label="Ruscha" {...register("address.ru")} />
					<Input label="Inglizcha" {...register("address.en")} />
				</div>
			</div>

			{/* Contact */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<Input
					label="Telefon"
					placeholder="+998901234567"
					{...register("phone")}
					error={errors.phone?.message}
				/>
				<Input
					label="Email"
					type="email"
					placeholder="info@restaurant.uz"
					{...register("email")}
					error={errors.email?.message}
				/>
			</div>

			{/* URLs */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<Input
					label="Logo URL"
					placeholder="https://..."
					{...register("logoUrl")}
					error={errors.logoUrl?.message}
				/>
				<Input
					label="Banner URL"
					placeholder="https://..."
					{...register("bannerUrl")}
					error={errors.bannerUrl?.message}
				/>
			</div>

			{/* Working Hours */}
			<div className="grid grid-cols-2 gap-3">
				<Input label="Ish boshlanish vaqti" type="time" {...register("workingHoursStart")} />
				<Input label="Ish tugash vaqti" type="time" {...register("workingHoursEnd")} />
			</div>

			{/* Fees */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<Input
					label="Yetkazib berish narxi"
					type="number"
					placeholder="0"
					{...register("deliveryFee")}
					error={errors.deliveryFee?.message}
				/>
				<Input
					label="Min buyurtma"
					type="number"
					placeholder="0"
					{...register("minOrderAmount")}
					error={errors.minOrderAmount?.message}
				/>
				<Input
					label="O'rtacha vaqt (min)"
					type="number"
					placeholder="30"
					{...register("averageDeliveryTime")}
					error={errors.averageDeliveryTime?.message}
				/>
			</div>

			<Button type="submit" loading={loading} className="mt-1">
				Saqlash
			</Button>
		</form>
	);
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteConfirm({
	restaurant,
	onConfirm,
	onCancel,
	loading,
}: {
	restaurant: RestaurantDto;
	onConfirm: () => void;
	onCancel: () => void;
	loading: boolean;
}) {
	return (
		<div className="flex flex-col gap-4">
			<p className="text-sm text-gray-600">
				<span className="font-semibold text-gray-900">
					{restaurant.nameStr ?? restaurant.name?.uz}
				</span>{" "}
				restoranini o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.
			</p>
			<div className="flex justify-end gap-2">
				<Button variant="secondary" onClick={onCancel}>
					Bekor qilish
				</Button>
				<Button variant="danger" loading={loading} onClick={onConfirm}>
					O'chirish
				</Button>
			</div>
		</div>
	);
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RestaurantsPage() {
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");
	const [filterOpen, setFilterOpen] = useState<boolean | undefined>(undefined);
	const [filterActive, setFilterActive] = useState<boolean | undefined>(undefined);

	const [createOpen, setCreateOpen] = useState(false);
	const [editRestaurant, setEditRestaurant] = useState<RestaurantDto | null>(null);
	const [deleteRestaurant, setDeleteRestaurant] = useState<RestaurantDto | null>(null);

	const criteria = {
		name: search || undefined,
		isOpen: filterOpen,
		isActive: filterActive,
	};

	const { data, isLoading } = useRestaurants(criteria, page, 10);
	const restaurants = data?.data ?? [];
	const meta = data?.meta;

	const createMutation = useCreateRestaurant();
	const updateMutation = useUpdateRestaurant();
	const deleteMutation = useDeleteRestaurant();
	const toggleOpenMutation = useToggleRestaurantOpen();
	const toggleActiveMutation = useToggleRestaurantActive();

	function toFormDefaults(r: RestaurantDto): Partial<RestaurantFormData> {
		return {
			name: r.name ?? {},
			description: r.description ?? {},
			address: r.address ?? {},
			phone: r.phone ?? "",
			email: r.email ?? "",
			logoUrl: r.logoUrl ?? "",
			bannerUrl: r.bannerUrl ?? "",
			workingHoursStart: r.workingHoursStart ?? "",
			workingHoursEnd: r.workingHoursEnd ?? "",
			deliveryFee: r.deliveryFee,
			minOrderAmount: r.minOrderAmount,
			averageDeliveryTime: r.averageDeliveryTime,
		};
	}

	function handleCreate(data: RestaurantFormData) {
		createMutation.mutate(data, {
			onSuccess: () => setCreateOpen(false),
		});
	}

	function handleEdit(data: RestaurantFormData) {
		if (!editRestaurant?.id) return;
		updateMutation.mutate(
			{ id: editRestaurant.id, body: data },
			{ onSuccess: () => setEditRestaurant(null) },
		);
	}

	function handleDelete() {
		if (!deleteRestaurant?.id) return;
		deleteMutation.mutate(deleteRestaurant.id, {
			onSuccess: () => setDeleteRestaurant(null),
		});
	}

	const totalPages = meta?.totalPages ?? 1;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-xl font-bold text-gray-900">Restoranlar</h1>
					{meta?.total !== undefined && (
						<p className="mt-0.5 text-sm text-gray-500">Jami {meta.total} ta restoran</p>
					)}
				</div>
				<Button onClick={() => setCreateOpen(true)} className="w-full sm:w-auto">
					<Plus size={16} />
					Restoran qo'shish
				</Button>
			</div>

			{/* Filters */}
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative flex-1">
					<Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Restoran nomi bo'yicha qidirish..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(0);
						}}
						className="h-10 w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
					/>
				</div>
				<div className="flex gap-2">
					<select
						value={filterOpen === undefined ? "" : String(filterOpen)}
						onChange={(e) => {
							setFilterOpen(e.target.value === "" ? undefined : e.target.value === "true");
							setPage(0);
						}}
						className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none"
					>
						<option value="">Barcha holat</option>
						<option value="true">Ochiq</option>
						<option value="false">Yopiq</option>
					</select>
					<select
						value={filterActive === undefined ? "" : String(filterActive)}
						onChange={(e) => {
							setFilterActive(e.target.value === "" ? undefined : e.target.value === "true");
							setPage(0);
						}}
						className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none"
					>
						<option value="">Barcha faollik</option>
						<option value="true">Faol</option>
						<option value="false">Nofaol</option>
					</select>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-100 bg-gray-50/60">
								<th className="px-4 py-3 text-left font-medium text-gray-500">Restoran</th>
								<th className="hidden px-4 py-3 text-left font-medium text-gray-500 md:table-cell">
									Telefon
								</th>
								<th className="hidden px-4 py-3 text-left font-medium text-gray-500 lg:table-cell">
									Ish vaqti
								</th>
								<th className="px-4 py-3 text-center font-medium text-gray-500">Ochiq</th>
								<th className="px-4 py-3 text-center font-medium text-gray-500">Faol</th>
								<th className="hidden px-4 py-3 text-center font-medium text-gray-500 sm:table-cell">
									Reyting
								</th>
								<th className="px-4 py-3 text-right font-medium text-gray-500">Amallar</th>
							</tr>
						</thead>
						<tbody>
							{isLoading
								? Array.from({ length: 6 }).map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
										<tr key={i} className="border-b border-gray-50">
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													<div className="h-9 w-9 animate-pulse rounded-lg bg-gray-100" />
													<div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
												</div>
											</td>
											<td className="hidden px-4 py-3 md:table-cell">
												<div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
											</td>
											<td className="hidden px-4 py-3 lg:table-cell">
												<div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
											</td>
											<td className="px-4 py-3 text-center">
												<div className="mx-auto h-5 w-9 animate-pulse rounded-full bg-gray-100" />
											</td>
											<td className="px-4 py-3 text-center">
												<div className="mx-auto h-5 w-9 animate-pulse rounded-full bg-gray-100" />
											</td>
											<td className="hidden px-4 py-3 sm:table-cell">
												<div className="mx-auto h-4 w-10 animate-pulse rounded bg-gray-100" />
											</td>
											<td className="px-4 py-3 text-right">
												<div className="ml-auto h-7 w-16 animate-pulse rounded bg-gray-100" />
											</td>
										</tr>
									))
								: restaurants.map((r) => (
										<tr
											key={r.id}
											className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
										>
											{/* Name + logo */}
											<td className="px-4 py-3">
												<div className="flex items-center gap-3">
													{r.logoUrl ? (
														<img
															src={r.logoUrl}
															alt={r.nameStr ?? ""}
															className="h-9 w-9 rounded-lg object-cover"
														/>
													) : (
														<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
															{(r.nameStr ?? r.name?.uz ?? "?")[0].toUpperCase()}
														</div>
													)}
													<div>
														<div className="font-medium text-gray-900">
															{r.nameStr ?? r.name?.uz}
														</div>
														<div className="text-xs text-gray-400">
															{r.addressStr ?? r.address?.uz}
														</div>
													</div>
												</div>
											</td>

											{/* Phone */}
											<td className="hidden px-4 py-3 text-gray-600 md:table-cell">
												{r.phone ?? "—"}
											</td>

											{/* Working hours */}
											<td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
												{r.workingHoursStart && r.workingHoursEnd
													? `${r.workingHoursStart} – ${r.workingHoursEnd}`
													: "—"}
											</td>

											{/* Toggle open */}
											<td className="px-4 py-3 text-center">
												<div className="flex justify-center">
													<Toggle
														checked={r.isOpen ?? false}
														onChange={() => r.id && toggleOpenMutation.mutate(r.id)}
														loading={
															toggleOpenMutation.isPending && toggleOpenMutation.variables === r.id
														}
													/>
												</div>
											</td>

											{/* Toggle active */}
											<td className="px-4 py-3 text-center">
												<div className="flex justify-center">
													<Toggle
														checked={r.isActive ?? false}
														onChange={() => r.id && toggleActiveMutation.mutate(r.id)}
														loading={
															toggleActiveMutation.isPending &&
															toggleActiveMutation.variables === r.id
														}
													/>
												</div>
											</td>

											{/* Rating */}
											<td className="hidden px-4 py-3 text-center sm:table-cell">
												{r.rating !== undefined && r.rating > 0 ? (
													<span className="inline-flex items-center gap-1 font-medium text-amber-500">
														<Star size={13} className="fill-amber-400 text-amber-400" />
														{r.rating.toFixed(1)}
													</span>
												) : (
													<span className="text-gray-300">—</span>
												)}
											</td>

											{/* Actions */}
											<td className="px-4 py-3 text-right">
												<div className="flex items-center justify-end gap-1">
													<button
														type="button"
														onClick={() => setEditRestaurant(r)}
														className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
														title="Tahrirlash"
													>
														<Edit2 size={15} />
													</button>
													<button
														type="button"
														onClick={() => setDeleteRestaurant(r)}
														className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
														title="O'chirish"
													>
														<Trash2 size={15} />
													</button>
												</div>
											</td>
										</tr>
									))}

							{!isLoading && restaurants.length === 0 && (
								<tr>
									<td colSpan={7} className="px-4 py-12 text-center text-gray-400">
										Restoranlar topilmadi
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
						<span className="text-xs text-gray-500">
							{page + 1} / {totalPages} sahifa
						</span>
						<div className="flex gap-1">
							<button
								type="button"
								disabled={page === 0}
								onClick={() => setPage((p) => p - 1)}
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronLeft size={15} />
							</button>
							<button
								type="button"
								disabled={page >= totalPages - 1}
								onClick={() => setPage((p) => p + 1)}
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronRight size={15} />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Create Modal */}
			<Modal
				open={createOpen}
				onClose={() => setCreateOpen(false)}
				title="Yangi restoran qo'shish"
				size="xl"
			>
				<RestaurantForm onSubmit={handleCreate} loading={createMutation.isPending} />
			</Modal>

			{/* Edit Modal */}
			<Modal
				open={editRestaurant !== null}
				onClose={() => setEditRestaurant(null)}
				title="Restoranni tahrirlash"
				size="xl"
			>
				{editRestaurant && (
					<RestaurantForm
						defaultValues={toFormDefaults(editRestaurant)}
						onSubmit={handleEdit}
						loading={updateMutation.isPending}
					/>
				)}
			</Modal>

			{/* Delete Modal */}
			<Modal
				open={deleteRestaurant !== null}
				onClose={() => setDeleteRestaurant(null)}
				title="Restoranni o'chirish"
				size="sm"
			>
				{deleteRestaurant && (
					<DeleteConfirm
						restaurant={deleteRestaurant}
						onConfirm={handleDelete}
						onCancel={() => setDeleteRestaurant(null)}
						loading={deleteMutation.isPending}
					/>
				)}
			</Modal>
		</div>
	);
}
