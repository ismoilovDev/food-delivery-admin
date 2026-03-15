import { useNavigate, useParams } from "react-router";
import { useRestaurantById } from "~/lib/api/hooks/useRestaurants";

export function useFormPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const isEdit = !!id;
	const numId = Number(id ?? 0);

	const { data: restaurant, isLoading } = useRestaurantById(numId);

	function goBack() {
		navigate("/restaurants");
	}

	return { isEdit, numId, restaurant, isLoading, goBack };
}
