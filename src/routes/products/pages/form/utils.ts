import type { ProductDto } from "~/lib/api/services/products";
import type { ProductFormData } from "./schema";

export function toFormDefaults(product: ProductDto): Partial<ProductFormData> {
	return {
		name: { uz: product.name?.uz ?? "", ru: product.name?.ru, en: product.name?.en },
		description: product.description ?? {},
		categoryId: product.categoryId,
		restaurantId: product.restaurantId,
		price: product.price,
		discountPrice: product.discountPrice,
		discountPercentage: product.discountPercentage,
		mainImageUrl: product.mainImageUrl ?? "",
		stockQuantity: product.stockQuantity,
		minOrderQuantity: product.minOrderQuantity,
		maxOrderQuantity: product.maxOrderQuantity,
		preparationTime: product.preparationTime,
		calories: product.calories,
		weight: product.weight,
		isVegetarian: product.isVegetarian,
		isSpicy: product.isSpicy,
		spicyLevel: product.spicyLevel,
	};
}
