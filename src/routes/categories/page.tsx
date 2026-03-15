import { Plus } from "lucide-react";
import { useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { buttonVariants } from "~/components/ui/Button";
import { DataTable } from "~/components/ui/DataTable";
import { createCategoryColumns } from "./components/columns";
import { CategoryFilter } from "./components/filter";
import { usePage } from "./usePage";

export default function CategoriesPage() {
	const {
		categories,
		meta,
		isLoading,
		page,
		handlePageChange,
		search,
		filterActive,
		hasActiveFilters,
		handleSearchChange,
		handleFilterActiveChange,
		handleClearFilters,
		handleToggleActive,
		toggleActivePendingId,
	} = usePage();

	const navigate = useNavigate();

	const columns = useMemo(
		() =>
			createCategoryColumns({
				onToggleActive: handleToggleActive,
				toggleActivePendingId: toggleActivePendingId ?? null,
				onDelete: (id) => navigate(`/categories/${id}/delete`),
			}),
		[handleToggleActive, toggleActivePendingId, navigate],
	);

	return (
		<div className="flex flex-col gap-5">
			{/* Page header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-lg font-bold text-gray-900">Kategoriyalar</h1>
					<p className="mt-0.5 text-sm text-gray-400">
						{meta?.total !== undefined ? `${meta.total} ta kategoriya` : "Yuklanmoqda..."}
					</p>
				</div>
				<Link
					to="/categories/new"
					className={`${buttonVariants({ variant: "primary" })} w-full gap-2 sm:w-auto`}
				>
					<Plus size={15} />
					Qo'shish
				</Link>
			</div>

			{/* Filter */}
			<CategoryFilter
				search={search}
				filterActive={filterActive}
				hasActiveFilters={hasActiveFilters}
				onSearchChange={handleSearchChange}
				onActiveChange={handleFilterActiveChange}
				onClear={handleClearFilters}
			/>

			{/* Table */}
			<DataTable
				columns={columns}
				data={categories}
				isLoading={isLoading}
				emptyTitle="Kategoriyalar topilmadi"
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
