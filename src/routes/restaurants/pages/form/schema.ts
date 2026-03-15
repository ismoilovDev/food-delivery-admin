import { z } from "zod";

export const i18nSchema = z.object({
	uz: z.string().optional(),
	ru: z.string().optional(),
	en: z.string().optional(),
});

export const restaurantSchema = z.object({
	name: i18nSchema,
	description: i18nSchema.optional(),
	address: i18nSchema.optional(),
	phone: z.string().optional(),
	email: z.string().email("Noto'g'ri email format").optional().or(z.literal("")),
	logoUrl: z.string().url("Noto'g'ri URL format").optional().or(z.literal("")),
	bannerUrl: z.string().url("Noto'g'ri URL format").optional().or(z.literal("")),
	workingHoursStart: z.string().optional(),
	workingHoursEnd: z.string().optional(),
	// FormInput type="number" passes valueAsNumber → native number value
	deliveryFee: z.number().min(0, "Manfiy bo'lmasligi kerak").optional(),
	minOrderAmount: z.number().min(0, "Manfiy bo'lmasligi kerak").optional(),
	averageDeliveryTime: z.number().min(0, "Manfiy bo'lmasligi kerak").optional(),
});

export type RestaurantFormData = z.infer<typeof restaurantSchema>;
