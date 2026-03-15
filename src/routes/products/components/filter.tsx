import { Filter, Search } from "lucide-react";
import { useAllCategories } from "~/lib/api/hooks/useCategories";

interface ProductFilterProps {
	search: string;
	categoryId: number | undefined;
	filterAvailable: boolean | undefined;
	hasActiveFilters: boolean;
	onSearchChange: (value: string) => void;
	onCategoryChange: (value: number | undefined) => void;
	onAvailableChange: (value: boolean | undefined) => void;
	onClear: () => void;
}

export function ProductFilter({
	search,
	categoryId,
	filterAvailable,
	hasActiveFilters,
	onSearchChange,
	onCategoryChange,
	onAvailableChange,
	onClear,
}: ProductFilterProps) {
	const { data: categories = [] } = useAllCategories();

	return (
		<div className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
			<div className="relative flex-1">
				<Search size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
				<input
					type="text"
					placeholder="Mahsulot nomi..."
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50 pr-3 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition-colors"
				/>
			</div>

			<div className="flex items-center gap-2">
				<Filter size={14} className="shrink-0 text-gray-400" />
				<select
					value={categoryId ?? ""}
					onChange={(e) =>
						onCategoryChange(e.target.value === "" ? undefined : Number(e.target.value))
					}
					className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition-colors"
				>
					<option value="">Barcha kategoriyalar</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name?.uz ?? cat.name?.ru ?? `#${cat.id}`}
						</option>
					))}
				</select>

				<select
					value={filterAvailable === undefined ? "" : String(filterAvailable)}
					onChange={(e) =>
						onAvailableChange(e.target.value === "" ? undefined : e.target.value === "true")
					}
					className="h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition-colors"
				>
					<option value="">Mavjudlik</option>
					<option value="true">Mavjud</option>
					<option value="false">Mavjud emas</option>
				</select>

				{hasActiveFilters && (
					<button
						type="button"
						onClick={onClear}
						className="h-9 rounded-xl px-3 text-xs font-medium text-orange-500 hover:bg-orange-50 transition-colors"
					>
						Tozalash
					</button>
				)}
			</div>
		</div>
	);
}
