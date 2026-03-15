import { z } from "zod";

const i18nSchema = z.object({
	uz: z.string().optional(),
	ru: z.string().optional(),
	en: z.string().optional(),
});

export const productSchema = z.object({
	name: z.object({
		uz: z.string().min(1, "O'zbekcha nom majburiy"),
		ru: z.string().optional(),
		en: z.string().optional(),
	}),
	description: i18nSchema.optional(),
	categoryId: z.number({ error: "Kategoriya majburiy" }).min(1, "Kategoriya tanlang"),
	restaurantId: z.number().optional(),
	price: z.number({ error: "Narx majburiy" }).min(0, "Manfiy bo'lmasligi kerak"),
	discountPrice: z.number().min(0).optional(),
	discountPercentage: z.number().min(0).max(100).optional(),
	mainImageUrl: z.string().url("Noto'g'ri URL").optional().or(z.literal("")),
	stockQuantity: z.number().min(0).optional(),
	minOrderQuantity: z.number().min(1).optional(),
	maxOrderQuantity: z.number().min(1).optional(),
	preparationTime: z.number().min(0).optional(),
	calories: z.number().min(0).optional(),
	weight: z.number().min(0).optional(),
	isVegetarian: z.boolean().optional(),
	isSpicy: z.boolean().optional(),
	spicyLevel: z.number().min(0).max(5).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
