import { Plus } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { buttonVariants } from "~/components/ui/button";
import { DataTable } from "~/components/ui/dataTable";
import { createRestaurantColumns } from "./components/columns";
import { RestaurantFilter } from "./components/filter";
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
				pagination={{
					page,
					totalPages: meta?.totalPages ?? 1,
					total: meta?.total,
					onPageChange: handlePageChange,
				}}
			/>

			{/* Delete modal via nested route */}
			<Outlet />
		</div>
	);
}
