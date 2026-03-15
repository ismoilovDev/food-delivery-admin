import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
	type RowData,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

declare module "@tanstack/react-table" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		/** Applied to both <th> and <td> (e.g. responsive visibility, alignment) */
		className?: string;
		/** Override only for <th> */
		headerClassName?: string;
		/** Override only for <td> */
		cellClassName?: string;
	}
}

interface PaginationProps {
	page: number;
	totalPages: number;
	total?: number;
	onPageChange: (page: number) => void;
}

interface DataTableProps<TData> {
	columns: ColumnDef<TData>[];
	data: TData[];
	isLoading?: boolean;
	skeletonRows?: number;
	emptyTitle?: string;
	emptyDescription?: string;
	pagination?: PaginationProps;
}

function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
	return (
		<div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
			<span className="text-xs text-gray-400">
				{page + 1} / {totalPages} sahifa
				{total != null && ` · ${total} ta`}
			</span>
			<div className="flex gap-1.5">
				<button
					type="button"
					disabled={page === 0}
					onClick={() => onPageChange(page - 1)}
					className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronLeft size={14} />
				</button>
				<button
					type="button"
					disabled={page >= totalPages - 1}
					onClick={() => onPageChange(page + 1)}
					className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
				>
					<ChevronRight size={14} />
				</button>
			</div>
		</div>
	);
}

export function DataTable<TData>({
	columns,
	data,
	isLoading = false,
	skeletonRows = 6,
	emptyTitle = "Ma'lumot topilmadi",
	emptyDescription,
	pagination,
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const headerGroups = table.getHeaderGroups();
	const allColumns = table.getAllColumns();
	const colCount = allColumns.length;

	return (
		<div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b border-gray-100">
								{headerGroup.headers.map((header) => {
									const meta = header.column.columnDef.meta;
									return (
										<th
											key={header.id}
											className={cn(
												"px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-400",
												meta?.className,
												meta?.headerClassName,
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>

					<tbody className="divide-y divide-gray-50">
						{isLoading
							? Array.from({ length: skeletonRows }).map((_, rowIdx) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
									<tr key={rowIdx}>
										{allColumns.map((col, colIdx) => {
											const meta = col.columnDef.meta;
											return (
												// biome-ignore lint/suspicious/noArrayIndexKey: skeleton
												<td
													key={colIdx}
													className={cn(
														"px-5 py-4",
														meta?.className,
														meta?.cellClassName,
													)}
												>
													<div className="h-4 animate-pulse rounded-md bg-gray-100" />
												</td>
											);
										})}
									</tr>
								))
							: table.getRowModel().rows.map((row) => (
									<tr key={row.id} className="transition-colors hover:bg-orange-50/30">
										{row.getVisibleCells().map((cell) => {
											const meta = cell.column.columnDef.meta;
											return (
												<td
													key={cell.id}
													className={cn(
														"px-5 py-4",
														meta?.className,
														meta?.cellClassName,
													)}
												>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								))}

						{!isLoading && data.length === 0 && (
							<tr>
								<td colSpan={colCount} className="px-5 py-16 text-center">
									<div className="flex flex-col items-center gap-2">
										<p className="font-medium text-gray-500">{emptyTitle}</p>
										{emptyDescription && (
											<p className="text-sm text-gray-400">{emptyDescription}</p>
										)}
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{pagination && pagination.totalPages > 1 && (
				<Pagination {...pagination} />
			)}
		</div>
	);
}
