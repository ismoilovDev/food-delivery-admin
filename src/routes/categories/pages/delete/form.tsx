import { Button } from "~/components/ui/Button";
import type { CategoryDto } from "~/lib/api/services/categories";

interface DeleteFormProps {
	category: CategoryDto;
	onConfirm: () => void;
	onCancel: () => void;
	isPending: boolean;
}

export function DeleteForm({ category, onConfirm, onCancel, isPending }: DeleteFormProps) {
	const name = category.name?.uz ?? "Bu kategoriya";

	return (
		<div className="flex flex-col gap-4">
			<p className="text-sm text-gray-600">
				<span className="font-semibold text-gray-900">{name}</span> kategoriyasini o'chirishni
				tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.
			</p>
			<div className="flex justify-end gap-2">
				<Button variant="secondary" type="button" onClick={onCancel}>
					Bekor qilish
				</Button>
				<Button variant="danger" type="button" loading={isPending} onClick={onConfirm}>
					O'chirish
				</Button>
			</div>
		</div>
	);
}
