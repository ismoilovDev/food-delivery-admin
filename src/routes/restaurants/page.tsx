import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { buttonVariants } from "~/components/ui/Button";
import { DataTable } from "~/components/ui/DataTable";
import { createRestaurantColumns } from "./components/columns";
import { RestaurantFilter } from "./components/RestaurantFilter";
import { usePage } from "./usePage";

export default function RestaurantsPage() {
	const {
		restaurants,
		meta,
		isLoading,
		page,
		handlePageChange,
		search,
		filterOpen,
		filterActive,
		hasActiveFilters,
		handleSearchChange,
		handleFilterOpenChange,
		handleFilterActiveChange,
		handleClearFilters,
		handleToggleOpen,
		handleToggleActive,
		toggleOpenPendingId,
		toggleActivePendingId,
	} = usePage();

	const navigate = useNavigate();
	const totalPages = meta?.totalPages ?? 1;

	const columns = useMemo(
		() =>
			createRestaurantColumns({
				onToggleOpen: handleToggleOpen,
				onToggleActive: handleToggleActive,
				toggleOpenPendingId: toggleOpenPendingId ?? null,
				toggleActivePendingId: toggleActivePendingId ?? null,
				onDelete: (id) => navigate(`/restaurants/${id}/delete`),
			}),
		[handleToggleOpen, handleToggleActive, toggleOpenPendingId, toggleActivePendingId, navigate],
	);

	const pagination = totalPages > 1 && (
		<div className="flex items-center justify-between px-5 py-3">
			<span className="text-xs text-gray-400">
				{page + 1} / {totalPages} sahifa
				{meta?.total && ` · ${meta.total} ta`}
			</span>
			<div className="flex gap-1.5">
				<button
					type="button"
					disabled={page === 0}
					onClick={() => handlePageChange(page - 1)}
					className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={14} />
				</button>
				<button
					type="button"
					disabled={page >= totalPages - 1}
					onClick={() => handlePageChange(page + 1)}
					className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronRight size={14} />
				</button>
			</div>
		</div>
	);

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

			{/* Filter */}
			<RestaurantFilter
				search={search}
				filterOpen={filterOpen}
				filterActive={filterActive}
				hasActiveFilters={hasActiveFilters}
				onSearchChange={handleSearchChange}
				onOpenChange={handleFilterOpenChange}
				onActiveChange={handleFilterActiveChange}
				onClear={handleClearFilters}
			/>

			{/* Table */}
			<DataTable
				columns={columns}
				data={restaurants}
				isLoading={isLoading}
				emptyTitle="Restoranlar topilmadi"
				emptyDescription="Qidiruv yoki filterni o'zgartiring"
				footer={pagination || undefined}
			/>

			{/* Delete modal via nested route */}
			<Outlet />
		</div>
	);
}
