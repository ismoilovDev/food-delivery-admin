import { useNavigate, useParams } from "react-router";
import { useProductById } from "~/lib/api/hooks/useProducts";

export function useFormPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const isEdit = !!id;
	const numId = Number(id ?? 0);

	const { data: product, isLoading } = useProductById(numId);

	function goBack() {
		navigate("/products");
	}

	return { isEdit, numId, product, isLoading, goBack };
}
