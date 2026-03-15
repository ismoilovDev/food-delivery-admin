import { useSearchParams } from "react-router";
import { useProducts, useToggleProductAvailability } from "~/lib/api/hooks/useProducts";

function parseOptBool(value: string | null): boolean | undefined {
	if (value === "true") return true;
	if (value === "false") return false;
	return undefined;
}

function parseOptNumber(value: string | null): number | undefined {
	if (value === null || value === "") return undefined;
	const n = Number(value);
	return Number.isNaN(n) ? undefined : n;
}

export function usePage() {
	const [searchParams, setSearchParams] = useSearchParams();

	// ── Read from URL ──────────────────────────────────────────────
	const search = searchParams.get("search") ?? "";
	const categoryId = parseOptNumber(searchParams.get("categoryId"));
	const filterAvailable = parseOptBool(searchParams.get("isAvailable"));
	const page = Number(searchParams.get("page") ?? "0");

	// ── Query ─────────────────────────────────────────────────────
	const criteria = {
		name: search || undefined,
		categoryId: categoryId,
		isAvailable: filterAvailable,
	};

	const { data, isLoading } = useProducts(criteria, page, 10);
	const products = data?.data ?? [];
	const meta = data?.meta;

	// ── Toggles ───────────────────────────────────────────────────
	const toggleAvailabilityMutation = useToggleProductAvailability();

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

	function handleCategoryChange(value: number | undefined) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (value !== undefined) next.set("categoryId", String(value));
				else next.delete("categoryId");
				next.delete("page");
				return next;
			},
			{ replace: true },
		);
	}

	function handleAvailableChange(value: boolean | undefined) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (value !== undefined) next.set("isAvailable", String(value));
				else next.delete("isAvailable");
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

	function handleToggleAvailability(id: number) {
		toggleAvailabilityMutation.mutate(id);
	}

	return {
		// data
		products,
		meta,
		isLoading,
		// pagination
		page,
		handlePageChange,
		// filters
		search,
		categoryId,
		filterAvailable,
		hasActiveFilters: search !== "" || categoryId !== undefined || filterAvailable !== undefined,
		handleSearchChange,
		handleCategoryChange,
		handleAvailableChange,
		handleClearFilters,
		// toggles
		handleToggleAvailability,
		toggleAvailabilityPendingId: toggleAvailabilityMutation.isPending
			? toggleAvailabilityMutation.variables
			: null,
	};
}
