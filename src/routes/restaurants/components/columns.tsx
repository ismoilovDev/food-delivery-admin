import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Star, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Toggle } from "~/components/ui/Toggle";
import type { RestaurantDto } from "~/lib/api/services/restaurants";
import { formatWorkingHours, getRestaurantInitial } from "../utils";

interface ColumnOptions {
	onToggleOpen: (id: number) => void;
	onToggleActive: (id: number) => void;
	toggleOpenPendingId: number | null;
	toggleActivePendingId: number | null;
	onDelete: (id: number) => void;
}

export function createRestaurantColumns({
	onToggleOpen,
	onToggleActive,
	toggleOpenPendingId,
	toggleActivePendingId,
	onDelete,
}: ColumnOptions): ColumnDef<RestaurantDto>[] {
	return [
		{
			id: "name",
			header: "Restoran",
			cell: ({ row }) => {
				const r = row.original;
				return (
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
							<p className="text-xs text-gray-400">{r.addressStr ?? r.address?.uz ?? "—"}</p>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: "phone",
			header: "Telefon",
			meta: {
				className: "hidden md:table-cell",
				cellClassName: "text-gray-500",
			},
			cell: ({ getValue }) => getValue<string | undefined>() ?? "—",
		},
		{
			id: "workingHours",
			header: "Ish vaqti",
			meta: { className: "hidden lg:table-cell" },
			cell: ({ row }) => (
				<span className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
					{formatWorkingHours(row.original.workingHoursStart, row.original.workingHoursEnd)}
				</span>
			),
		},
		{
			id: "isOpen",
			header: "Ochiq",
			meta: { className: "text-center" },
			cell: ({ row }) => {
				const r = row.original;
				return (
					<div className="flex justify-center">
						<Toggle
							checked={r.isOpen ?? false}
							onChange={() => r.id && onToggleOpen(r.id)}
							loading={toggleOpenPendingId === r.id}
						/>
					</div>
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
			accessorKey: "rating",
			header: "Reyting",
			meta: { className: "hidden text-center sm:table-cell" },
			cell: ({ getValue }) => {
				const rating = getValue<number | undefined>();
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
							to={`/restaurants/${r.id}/edit`}
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
