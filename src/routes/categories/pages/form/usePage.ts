import { useNavigate, useParams } from "react-router";
import { useCategoryById } from "~/lib/api/hooks/useCategories";

export function useFormPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const isEdit = !!id;
	const numId = Number(id ?? 0);

	const { data: category, isLoading } = useCategoryById(numId);

	function goBack() {
		navigate("/categories");
	}

	return { isEdit, numId, category, isLoading, goBack };
}
