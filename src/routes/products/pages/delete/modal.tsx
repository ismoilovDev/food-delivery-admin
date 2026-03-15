import { useNavigate, useParams } from "react-router";
import { Modal } from "~/components/ui/modal";
import { useProductById } from "~/lib/api/hooks/useProducts";
import { DeleteForm } from "./form";
import { useDeleteAction } from "./useFormActions";

export function DeleteModal() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const numId = id ? Number(id) : 0;

	const { data: product } = useProductById(numId);

	function handleClose() {
		navigate(-1);
	}

	const deleteAction = useDeleteAction(handleClose);

	return (
		<Modal open onClose={handleClose} title="Mahsulotni o'chirish" size="sm">
			{product ? (
				<DeleteForm
					product={product}
					onConfirm={() => deleteAction.submit(numId)}
					onCancel={handleClose}
					isPending={deleteAction.isPending}
				/>
			) : (
				<div className="h-16 animate-pulse rounded-xl bg-gray-100" />
			)}
		</Modal>
	);
}
