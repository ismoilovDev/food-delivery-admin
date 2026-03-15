import { useSearchParams } from "react-router";
import { useCategories, useToggleCategoryActive } from "~/lib/api/hooks/useCategories";

function parseOptBool(value: string | null): boolean | undefined {
	if (value === "true") return true;
	if (value === "false") return false;
	return undefined;
}

export function usePage() {
	const [searchParams, setSearchParams] = useSearchParams();

	// ── Read from URL ──────────────────────────────────────────────
	const search = searchParams.get("search") ?? "";
	const filterActive = parseOptBool(searchParams.get("isActive"));
	const page = Number(searchParams.get("page") ?? "0");

	// ── Query ─────────────────────────────────────────────────────
	const criteria = {
		name: search || undefined,
		isActive: filterActive,
	};

	const { data, isLoading } = useCategories(criteria, page, 10);
	const categories = data?.data ?? [];
	const meta = data?.meta;

	// ── Toggles ───────────────────────────────────────────────────
	const toggleActiveMutation = useToggleCategoryActive();

	// ── URL writers ───────────────────────────────────────────────
	function handleSearchChange(value: string) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (value) next.set("search", value);
				else next.delete("search");
				next.delete("page");
				return next;
			},
			{ replace: true },
		);
	}

	function handleFilterActiveChange(value: boolean | undefined) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (value !== undefined) next.set("isActive", String(value));
				else next.delete("isActive");
				next.delete("page");
				return next;
			},
			{ replace: true },
		);
	}

	function handleClearFilters() {
		setSearchParams(new URLSearchParams(), { replace: true });
	}

	function handlePageChange(newPage: number) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (newPage === 0) next.delete("page");
				else next.set("page", String(newPage));
				return next;
			},
			{ replace: true },
		);
	}

	function handleToggleActive(id: number) {
		toggleActiveMutation.mutate(id);
	}

	return {
		// data
		categories,
		meta,
		isLoading,
		// pagination
		page,
		handlePageChange,
		// filters
		search,
		filterActive,
		hasActiveFilters: search !== "" || filterActive !== undefined,
		handleSearchChange,
		handleFilterActiveChange,
		handleClearFilters,
		// toggles
		handleToggleActive,
		toggleActivePendingId: toggleActiveMutation.isPending ? toggleActiveMutation.variables : null,
	};
}
