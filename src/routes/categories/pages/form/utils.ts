import type { CategoryDto } from "~/lib/api/services/categories";
import type { CategoryFormData } from "./schema";

export function toFormDefaults(category: CategoryDto): Partial<CategoryFormData> {
	return {
		name: { uz: category.name?.uz ?? "", ru: category.name?.ru, en: category.name?.en },
		description: category.description ?? {},
		imageUrl: category.imageUrl ?? "",
		icon: category.icon ?? "",
		orderIndex: category.orderIndex,
		parentId: category.parentId,
	};
}
