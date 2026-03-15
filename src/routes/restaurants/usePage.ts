import { useState } from "react";
import {
	useRestaurants,
	useToggleRestaurantActive,
	useToggleRestaurantOpen,
} from "~/lib/api/hooks/useRestaurants";
import type { RestaurantDto } from "~/lib/api/services/restaurants";

export function usePage() {
	// ── Filters & pagination ──────────────────────────────────────
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");
	const [filterOpen, setFilterOpen] = useState<boolean | undefined>(undefined);
	const [filterActive, setFilterActive] = useState<boolean | undefined>(undefined);

	// ── Delete modal ──────────────────────────────────────────────
	const [deleteTarget, setDeleteTarget] = useState<RestaurantDto | null>(null);

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

	function handleSearchChange(value: string) {
		setSearch(value);
		setPage(0);
	}

	function handleFilterOpenChange(value: boolean | undefined) {
		setFilterOpen(value);
		setPage(0);
	}

	function handleFilterActiveChange(value: boolean | undefined) {
		setFilterActive(value);
		setPage(0);
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
		setPage,
		// filters
		search,
		filterOpen,
		filterActive,
		handleSearchChange,
		handleFilterOpenChange,
		handleFilterActiveChange,
		// delete modal
		deleteTarget,
		setDeleteTarget,
		// toggles
		handleToggleOpen,
		handleToggleActive,
		toggleOpenPendingId: toggleOpenMutation.isPending ? toggleOpenMutation.variables : null,
		toggleActivePendingId: toggleActiveMutation.isPending ? toggleActiveMutation.variables : null,
	};
}
