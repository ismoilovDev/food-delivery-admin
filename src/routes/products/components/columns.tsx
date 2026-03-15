import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Star, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Toggle } from "~/components/ui/toggle";
import type { ProductDto } from "~/lib/api/services/products";
import { formatPrice, getProductInitial } from "../utils";

interface ColumnOptions {
	onToggleAvailability: (id: number) => void;
	toggleAvailabilityPendingId: number | null;
	onDelete: (id: number) => void;
}

export function createProductColumns({
	onToggleAvailability,
	toggleAvailabilityPendingId,
	onDelete,
}: ColumnOptions): ColumnDef<ProductDto>[] {
	return [
		{
			id: "name",
			header: "Mahsulot",
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex items-center gap-3">
						{r.mainImageUrl ? (
							<img
								src={r.mainImageUrl}
								alt={r.name?.uz ?? ""}
								className="h-10 w-10 rounded-xl object-cover shadow-sm"
							/>
						) : (
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-500">
								{getProductInitial(r.name?.uz)}
							</div>
						)}
						<div>
							<p className="font-semibold text-gray-800">{r.name?.uz ?? r.name?.ru}</p>
							{r.categoryName && <p className="text-xs text-gray-400">{r.categoryName}</p>}
						</div>
					</div>
				);
			},
		},
		{
			id: "restaurant",
			header: "Restoran",
			meta: {
				className: "hidden md:table-cell",
				cellClassName: "text-gray-500",
			},
			cell: ({ row }) => row.original.restaurantName ?? "—",
		},
		{
			id: "price",
			header: "Narx",
			cell: ({ row }) => {
				const r = row.original;
				if (r.discountPrice != null) {
					return (
						<div>
							<p className="font-semibold text-orange-500">{formatPrice(r.discountPrice)} so'm</p>
							<p className="text-xs text-gray-400 line-through">{formatPrice(r.price)} so'm</p>
						</div>
					);
				}
				return <span className="text-gray-800">{formatPrice(r.price)} so'm</span>;
			},
		},
		{
			id: "stockQuantity",
			header: "Zaxira",
			meta: {
				className: "hidden sm:table-cell text-center",
				headerClassName: "text-center",
			},
			cell: ({ row }) => {
				const qty = row.original.stockQuantity;
				if (qty == null || qty === 0) {
					return (
						<span className="inline-flex items-center justify-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500">
							Tugagan
						</span>
					);
				}
				return (
					<span className="inline-flex items-center justify-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
						{qty}
					</span>
				);
			},
		},
		{
			id: "rating",
			header: "Reyting",
			meta: {
				className: "hidden lg:table-cell text-center",
				headerClassName: "text-center",
			},
			cell: ({ row }) => {
				const rating = row.original.rating;
				return rating && rating > 0 ? (
					<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
						<Star size={11} className="fill-amber-400 text-amber-400" />
						{rating.toFixed(1)}
					</span>
				) : (
					<span className="text-gray-300">—</span>
				);
			},
		},
		{
			id: "isAvailable",
			header: "Mavjud",
			meta: { className: "text-center" },
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex justify-center">
						<Toggle
							checked={r.isAvailable ?? false}
							onChange={() => r.id && onToggleAvailability(r.id)}
							loading={toggleAvailabilityPendingId === r.id}
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
							to={`/products/${r.id}/edit`}
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
