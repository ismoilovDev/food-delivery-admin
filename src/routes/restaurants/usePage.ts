import { useSearchParams } from "react-router";
import {
	useRestaurants,
	useToggleRestaurantActive,
	useToggleRestaurantOpen,
} from "~/lib/api/hooks/useRestaurants";

function parseOptBool(value: string | null): boolean | undefined {
	if (value === "true") return true;
	if (value === "false") return false;
	return undefined;
}

export function usePage() {
	const [searchParams, setSearchParams] = useSearchParams();

	// ── Read from URL ──────────────────────────────────────────────
	const search = searchParams.get("search") ?? "";
	const filterOpen = parseOptBool(searchParams.get("isOpen"));
	const filterActive = parseOptBool(searchParams.get("isActive"));
	const page = Number(searchParams.get("page") ?? "0");

	// ── Query ─────────────────────────────────────────────────────
	const criteria = {
		name: search || undefined,
		isOpen: filterOpen,
		isActive: filterActive,
	};

	const { data, isLoading } = useRestaurants(criteria, page, 10);
	const restaurants = data?.data ?? [];
	const meta = data?.meta;

	// ── Toggles ───────────────────────────────────────────────────
	const toggleOpenMutation = useToggleRestaurantOpen();
	const toggleActiveMutation = useToggleRestaurantActive();

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

	function handleFilterOpenChange(value: boolean | undefined) {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev);
				if (value !== undefined) next.set("isOpen", String(value));
				else next.delete("isOpen");
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

	function handleToggleOpen(id: number) {
		toggleOpenMutation.mutate(id);
	}

	function handleToggleActive(id: number) {
		toggleActiveMutation.mutate(id);
	}

	return {
		// data
		restaurants,
		meta,
		isLoading,
		// pagination
		page,
		handlePageChange,
		// filters
		search,
		filterOpen,
		filterActive,
		hasActiveFilters: search !== "" || filterOpen !== undefined || filterActive !== undefined,
		handleSearchChange,
		handleFilterOpenChange,
		handleFilterActiveChange,
		handleClearFilters,
		// toggles
		handleToggleOpen,
		handleToggleActive,
		toggleOpenPendingId: toggleOpenMutation.isPending ? toggleOpenMutation.variables : null,
		toggleActivePendingId: toggleActiveMutation.isPending ? toggleActiveMutation.variables : null,
	};
}
