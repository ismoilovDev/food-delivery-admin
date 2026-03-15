import { ChevronLeft, ChevronRight, Edit2, Plus, Search, Star, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "~/components/ui/Button";
import { Modal } from "~/components/ui/Modal";
import { Toggle } from "~/components/ui/Toggle";
import { DeleteForm } from "./pages/delete/form";
import { useDeleteAction } from "./pages/delete/useFormActions";
import { usePage } from "./usePage";
import { formatWorkingHours, getRestaurantInitial } from "./utils";

export default function RestaurantsPage() {
	const {
		restaurants,
		meta,
		isLoading,
		page,
		setPage,
		search,
		filterOpen,
		filterActive,
		handleSearchChange,
		handleFilterOpenChange,
		handleFilterActiveChange,
		deleteTarget,
		setDeleteTarget,
		handleToggleOpen,
		handleToggleActive,
		toggleOpenPendingId,
		toggleActivePendingId,
	} = usePage();

	const deleteAction = useDeleteAction(() => setDeleteTarget(null));

	const totalPages = meta?.totalPages ?? 1;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-xl font-bold text-gray-900">Restoranlar</h1>
					{meta?.total !== undefined && (
						<p className="mt-0.5 text-sm text-gray-500">Jami {meta.total} ta</p>
					)}
				</div>
				<Link
					to="/restaurants/new"
					className={`${buttonVariants({ variant: "primary" })} w-full sm:w-auto`}
				>
					<Plus size={16} />
					Restoran qo'shish
				</Link>
			</div>

			{/* Filters */}
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative flex-1">
					<Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Restoran nomi bo'yicha qidirish..."
						value={search}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="h-10 w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
					/>
				</div>
				<div className="flex gap-2">
					<select
						value={filterOpen === undefined ? "" : String(filterOpen)}
						onChange={(e) =>
							handleFilterOpenChange(e.target.value === "" ? undefined : e.target.value === "true")
						}
						className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none"
					>
						<option value="">Barcha holat</option>
						<option value="true">Ochiq</option>
						<option value="false">Yopiq</option>
					</select>
					<select
						value={filterActive === undefined ? "" : String(filterActive)}
						onChange={(e) =>
							handleFilterActiveChange(
								e.target.value === "" ? undefined : e.target.value === "true",
							)
						}
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
											<td className="px-4 py-3">
												<div className="mx-auto h-5 w-9 animate-pulse rounded-full bg-gray-100" />
											</td>
											<td className="px-4 py-3">
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
											className="border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50/50"
										>
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
															{getRestaurantInitial(r.nameStr, r.name?.uz)}
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
											<td className="hidden px-4 py-3 text-gray-600 md:table-cell">
												{r.phone ?? "—"}
											</td>
											<td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
												{formatWorkingHours(r.workingHoursStart, r.workingHoursEnd)}
											</td>
											<td className="px-4 py-3">
												<div className="flex justify-center">
													<Toggle
														checked={r.isOpen ?? false}
														onChange={() => r.id && handleToggleOpen(r.id)}
														loading={toggleOpenPendingId === r.id}
													/>
												</div>
											</td>
											<td className="px-4 py-3">
												<div className="flex justify-center">
													<Toggle
														checked={r.isActive ?? false}
														onChange={() => r.id && handleToggleActive(r.id)}
														loading={toggleActivePendingId === r.id}
													/>
												</div>
											</td>
											<td className="hidden px-4 py-3 text-center sm:table-cell">
												{r.rating && r.rating > 0 ? (
													<span className="inline-flex items-center gap-1 font-medium text-amber-500">
														<Star size={13} className="fill-amber-400 text-amber-400" />
														{r.rating.toFixed(1)}
													</span>
												) : (
													<span className="text-gray-300">—</span>
												)}
											</td>
											<td className="px-4 py-3 text-right">
												<div className="flex items-center justify-end gap-1">
													<Link
														to={`/restaurants/${r.id}/edit`}
														className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
														title="Tahrirlash"
													>
														<Edit2 size={15} />
													</Link>
													<button
														type="button"
														onClick={() => setDeleteTarget(r)}
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

			{/* Delete modal — confirmation only, modal as correct UX */}
			<Modal
				open={deleteTarget !== null}
				onClose={() => setDeleteTarget(null)}
				title="Restoranni o'chirish"
				size="sm"
			>
				{deleteTarget && (
					<DeleteForm
						restaurant={deleteTarget}
						onConfirm={() => deleteTarget.id && deleteAction.submit(deleteTarget.id)}
						onCancel={() => setDeleteTarget(null)}
						isPending={deleteAction.isPending}
					/>
				)}
			</Modal>
		</div>
	);
}
