import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Toggle } from "~/components/ui/Toggle";
import type { CategoryDto } from "~/lib/api/services/categories";
import { getCategoryInitial } from "../utils";

interface ColumnOptions {
	onToggleActive: (id: number) => void;
	toggleActivePendingId: number | null;
	onDelete: (id: number) => void;
}

export function createCategoryColumns({
	onToggleActive,
	toggleActivePendingId,
	onDelete,
}: ColumnOptions): ColumnDef<CategoryDto>[] {
	return [
		{
			id: "name",
			header: "Kategoriya",
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex items-center gap-3">
						{r.imageUrl ? (
							<img
								src={r.imageUrl}
								alt={r.name?.uz ?? ""}
								className="h-10 w-10 rounded-xl object-cover shadow-sm"
							/>
						) : r.icon ? (
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-lg">
								{r.icon}
							</div>
						) : (
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-500">
								{getCategoryInitial(r.name?.uz)}
							</div>
						)}
						<div>
							<p className="font-semibold text-gray-800">{r.name?.uz}</p>
							{r.parentName && <p className="text-xs text-gray-400">{r.parentName}</p>}
						</div>
					</div>
				);
			},
		},
		{
			id: "productsCount",
			header: "Mahsulotlar",
			meta: {
				className: "hidden sm:table-cell text-center",
				headerClassName: "text-center",
			},
			cell: ({ row }) => {
				const count = row.original.productsCount;
				if (!count) {
					return <span className="text-gray-300">—</span>;
				}
				return (
					<span className="inline-flex items-center justify-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
						{count}
					</span>
				);
			},
		},
		{
			id: "orderIndex",
			header: "Tartib",
			meta: {
				className: "hidden md:table-cell text-center",
				headerClassName: "text-center",
			},
			cell: ({ row }) => {
				const idx = row.original.orderIndex;
				return idx !== undefined && idx !== null ? (
					<span className="text-sm text-gray-600">{idx}</span>
				) : (
					<span className="text-gray-300">—</span>
				);
			},
		},
		{
			id: "isActive",
			header: "Faol",
			meta: { className: "text-center" },
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex justify-center">
						<Toggle
							checked={r.isActive ?? false}
							onChange={() => r.id && onToggleActive(r.id)}
							loading={toggleActivePendingId === r.id}
						/>
					</div>
				);
			},
		},
		{
			id: "actions",
			header: "Amallar",
			meta: {
				headerClassName: "text-right",
				cellClassName: "text-right",
			},
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex items-center justify-end gap-1">
						<Link
							to={`/categories/${r.id}/edit`}
							className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
							title="Tahrirlash"
						>
							<Edit2 size={15} />
						</Link>
						<button
							type="button"
							onClick={() => r.id && onDelete(r.id)}
							className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
							title="O'chirish"
						>
							<Trash2 size={15} />
						</button>
					</div>
				);
			},
		},
	];
}
