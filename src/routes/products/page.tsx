import { Plus } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { buttonVariants } from "~/components/ui/button";
import { DataTable } from "~/components/ui/dataTable";
import { createProductColumns } from "./components/columns";
import { ProductFilter } from "./components/filter";
import { usePage } from "./usePage";

export default function ProductsPage() {
	const {
		products,
		meta,
		isLoading,
		page,
		handlePageChange,
		search,
		categoryId,
		filterAvailable,
		hasActiveFilters,
		handleSearchChange,
		handleCategoryChange,
		handleAvailableChange,
		handleClearFilters,
		handleToggleAvailability,
		toggleAvailabilityPendingId,
	} = usePage();

	const navigate = useNavigate();

	const columns = useMemo(
		() =>
			createProductColumns({
				onToggleAvailability: handleToggleAvailability,
				toggleAvailabilityPendingId: toggleAvailabilityPendingId ?? null,
				onDelete: (id) => navigate(`/products/${id}/delete`),
			}),
		[handleToggleAvailability, toggleAvailabilityPendingId, navigate],
	);

	return (
		<div className="flex flex-col gap-5">
			{/* Page header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-lg font-bold text-gray-900">Mahsulotlar</h1>
					<p className="mt-0.5 text-sm text-gray-400">
						{meta?.total !== undefined ? `${meta.total} ta mahsulot` : "Yuklanmoqda..."}
					</p>
				</div>
				<Link
					to="/products/new"
					className={`${buttonVariants({ variant: "primary" })} w-full gap-2 sm:w-auto`}
				>
					<Plus size={15} />
					Qo'shish
				</Link>
			</div>

			{/* Filter */}
			<ProductFilter
				search={search}
				categoryId={categoryId}
				filterAvailable={filterAvailable}
				hasActiveFilters={hasActiveFilters}
				onSearchChange={handleSearchChange}
				onCategoryChange={handleCategoryChange}
				onAvailableChange={handleAvailableChange}
				onClear={handleClearFilters}
			/>

			{/* Table */}
			<DataTable
				columns={columns}
				data={products}
				isLoading={isLoading}
				emptyTitle="Mahsulotlar topilmadi"
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
