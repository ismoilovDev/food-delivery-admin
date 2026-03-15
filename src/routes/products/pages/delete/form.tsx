import { Button } from "~/components/ui/button";
import type { ProductDto } from "~/lib/api/services/products";

interface DeleteFormProps {
	product: ProductDto;
	onConfirm: () => void;
	onCancel: () => void;
	isPending: boolean;
}

export function DeleteForm({ product, onConfirm, onCancel, isPending }: DeleteFormProps) {
	const name = product.name?.uz ?? product.name?.ru ?? "Bu mahsulot";

	return (
		<div className="flex flex-col gap-4">
			<p className="text-sm text-gray-600">
				<span className="font-semibold text-gray-900">{name}</span> mahsulotini o'chirishni
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
