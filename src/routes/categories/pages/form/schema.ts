import { z } from "zod";

const i18nSchema = z.object({
	uz: z.string().optional(),
	ru: z.string().optional(),
	en: z.string().optional(),
});

export const categorySchema = z.object({
	name: z.object({
		uz: z.string().min(1, "O'zbekcha nom majburiy"),
		ru: z.string().optional(),
		en: z.string().optional(),
	}),
	description: i18nSchema.optional(),
	imageUrl: z.string().url("Noto'g'ri URL").optional().or(z.literal("")),
	icon: z.string().optional(),
	orderIndex: z.number().min(0).optional(),
	parentId: z.number().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
