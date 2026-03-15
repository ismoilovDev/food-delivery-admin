import { ChevronLeft, ChevronRight, Edit2, Filter, Plus, Search, Star, Trash2 } from "lucide-react";
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
	const hasActiveFilters = search !== "" || filterOpen !== undefined || filterActive !== undefined;

	return (
		<div className="flex flex-col gap-5">
			{/* Page header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-lg font-bold text-gray-900">Restoranlar</h1>
					<p className="mt-0.5 text-sm text-gray-400">
						{meta?.total !== undefined ? `${meta.total} ta restoran` : "Yuklanmoqda..."}
					</p>
				</div>
				<Link
					to="/restaurants/new"
					className={`${buttonVariants({ variant: "primary" })} w-full gap-2 sm:w-auto`}
				>
					<Plus size={15} />
					Qo'shish
				</Link>
			</div>

			{/* Filter bar */}
			<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
				<div className="relative flex-1">
					<Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Restoran nomi..."
						value={search}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50 pr-3 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition-colors"
					/>
				</div>

				<div className="flex items-center gap-2">
					<Filter size={14} className="shrink-0 text-gray-400" />
					<select
						value={filterOpen === undefined ? "" : String(filterOpen)}
						onChange={(e) =>
							handleFilterOpenChange(e.target.value === "" ? undefined : e.target.value === "true")
						}
						className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition-colors"
					>
						<option value="">Holat</option>
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
						className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition-colors"
					>
						<option value="">Faollik</option>
						<option value="true">Faol</option>
						<option value="false">Nofaol</option>
					</select>

					{hasActiveFilters && (
						<button
							type="button"
							onClick={() => {
								handleSearchChange("");
								handleFilterOpenChange(undefined);
								handleFilterActiveChange(undefined);
							}}
							className="h-9 rounded-xl px-3 text-xs font-medium text-orange-500 hover:bg-orange-50 transition-colors"
						>
							Tozalash
						</button>
					)}
				</div>
			</div>

			{/* Table card */}
			<div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-100">
								<th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
									Restoran
								</th>
								<th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 md:table-cell">
									Telefon
								</th>
								<th className="hidden px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 lg:table-cell">
									Ish vaqti
								</th>
								<th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
									Ochiq
								</th>
								<th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
									Faol
								</th>
								<th className="hidden px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wide text-gray-400 sm:table-cell">
									Reyting
								</th>
								<th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
									Amallar
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{isLoading
								? Array.from({ length: 6 }).map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
										<tr key={i}>
											<td className="px-5 py-4">
												<div className="flex items-center gap-3">
													<div className="h-10 w-10 animate-pulse rounded-xl bg-gray-100" />
													<div className="flex flex-col gap-1.5">
														<div className="h-3.5 w-32 animate-pulse rounded-md bg-gray-100" />
														<div className="h-3 w-20 animate-pulse rounded-md bg-gray-100" />
													</div>
												</div>
											</td>
											<td className="hidden px-5 py-4 md:table-cell">
												<div className="h-3.5 w-28 animate-pulse rounded-md bg-gray-100" />
											</td>
											<td className="hidden px-5 py-4 lg:table-cell">
												<div className="h-3.5 w-20 animate-pulse rounded-md bg-gray-100" />
											</td>
											<td className="px-5 py-4">
												<div className="mx-auto h-5 w-9 animate-pulse rounded-full bg-gray-100" />
											</td>
											<td className="px-5 py-4">
												<div className="mx-auto h-5 w-9 animate-pulse rounded-full bg-gray-100" />
											</td>
											<td className="hidden px-5 py-4 sm:table-cell">
												<div className="mx-auto h-3.5 w-10 animate-pulse rounded-md bg-gray-100" />
											</td>
											<td className="px-5 py-4 text-right">
												<div className="ml-auto h-7 w-16 animate-pulse rounded-lg bg-gray-100" />
											</td>
										</tr>
									))
								: restaurants.map((r) => (
										<tr key={r.id} className="transition-colors hover:bg-orange-50/30">
											{/* Name + Logo */}
											<td className="px-5 py-4">
												<div className="flex items-center gap-3">
													{r.logoUrl ? (
														<img
															src={r.logoUrl}
															alt={r.nameStr ?? ""}
															className="h-10 w-10 rounded-xl object-cover shadow-sm"
														/>
													) : (
														<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-500">
															{getRestaurantInitial(r.nameStr, r.name?.uz)}
														</div>
													)}
													<div>
														<p className="font-semibold text-gray-800">{r.nameStr ?? r.name?.uz}</p>
														<p className="text-xs text-gray-400">
															{r.addressStr ?? r.address?.uz ?? "—"}
														</p>
													</div>
												</div>
											</td>

											{/* Phone */}
											<td className="hidden px-5 py-4 text-gray-500 md:table-cell">
												{r.phone ?? "—"}
											</td>

											{/* Working hours */}
											<td className="hidden px-5 py-4 lg:table-cell">
												<span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
													{formatWorkingHours(r.workingHoursStart, r.workingHoursEnd)}
												</span>
											</td>

											{/* Toggle open */}
											<td className="px-5 py-4">
												<div className="flex justify-center">
													<Toggle
														checked={r.isOpen ?? false}
														onChange={() => r.id && handleToggleOpen(r.id)}
														loading={toggleOpenPendingId === r.id}
													/>
												</div>
											</td>

											{/* Toggle active */}
											<td className="px-5 py-4">
												<div className="flex justify-center">
													<Toggle
														checked={r.isActive ?? false}
														onChange={() => r.id && handleToggleActive(r.id)}
														loading={toggleActivePendingId === r.id}
													/>
												</div>
											</td>

											{/* Rating */}
											<td className="hidden px-5 py-4 text-center sm:table-cell">
												{r.rating && r.rating > 0 ? (
													<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
														<Star size={11} className="fill-amber-400 text-amber-400" />
														{r.rating.toFixed(1)}
													</span>
												) : (
													<span className="text-gray-300">—</span>
												)}
											</td>

											{/* Actions */}
											<td className="px-5 py-4 text-right">
												<div className="flex items-center justify-end gap-1">
													<Link
														to={`/restaurants/${r.id}/edit`}
														className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
														title="Tahrirlash"
													>
														<Edit2 size={15} />
													</Link>
													<button
														type="button"
														onClick={() => setDeleteTarget(r)}
														className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
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
									<td colSpan={7} className="px-5 py-16 text-center">
										<div className="flex flex-col items-center gap-2">
											<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
												<Search size={20} className="text-gray-400" />
											</div>
											<p className="font-medium text-gray-500">Restoranlar topilmadi</p>
											<p className="text-sm text-gray-400">Qidiruv yoki filterni o'zgartiring</p>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
						<span className="text-xs text-gray-400">
							{page + 1} / {totalPages} sahifa
							{meta?.total && ` · ${meta.total} ta`}
						</span>
						<div className="flex gap-1.5">
							<button
								type="button"
								disabled={page === 0}
								onClick={() => setPage((p) => p - 1)}
								className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronLeft size={14} />
							</button>
							<button
								type="button"
								disabled={page >= totalPages - 1}
								onClick={() => setPage((p) => p + 1)}
								className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
							>
								<ChevronRight size={14} />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Delete modal */}
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
