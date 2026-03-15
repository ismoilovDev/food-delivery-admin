import { useCreateProduct, useUpdateProduct } from "~/lib/api/hooks/useProducts";
import type { ProductReqDto } from "~/lib/api/services/products";
import type { ProductFormData } from "./schema";

export function useCreateAction(onSuccess: () => void) {
	const mutation = useCreateProduct();

	function submit(data: ProductFormData) {
		const body: ProductReqDto = {
			name: data.name,
			description: data.description,
			categoryId: data.categoryId,
			restaurantId: data.restaurantId,
			price: data.price,
			discountPrice: data.discountPrice,
			discountPercentage: data.discountPercentage,
			mainImageUrl: data.mainImageUrl || undefined,
			stockQuantity: data.stockQuantity,
			minOrderQuantity: data.minOrderQuantity,
			maxOrderQuantity: data.maxOrderQuantity,
			preparationTime: data.preparationTime,
			calories: data.calories,
			weight: data.weight,
			isVegetarian: data.isVegetarian,
			isSpicy: data.isSpicy,
			spicyLevel: data.spicyLevel,
		};
		mutation.mutate(body, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}

export function useEditAction(id: number, onSuccess: () => void) {
	const mutation = useUpdateProduct();

	function submit(data: ProductFormData) {
		const body: ProductReqDto = {
			name: data.name,
			description: data.description,
			categoryId: data.categoryId,
			restaurantId: data.restaurantId,
			price: data.price,
			discountPrice: data.discountPrice,
			discountPercentage: data.discountPercentage,
			mainImageUrl: data.mainImageUrl || undefined,
			stockQuantity: data.stockQuantity,
			minOrderQuantity: data.minOrderQuantity,
			maxOrderQuantity: data.maxOrderQuantity,
			preparationTime: data.preparationTime,
			calories: data.calories,
			weight: data.weight,
			isVegetarian: data.isVegetarian,
			isSpicy: data.isSpicy,
			spicyLevel: data.spicyLevel,
		};
		mutation.mutate({ id, body }, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
