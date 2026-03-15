import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormFileUploader, FormInput } from "~/components/inputs";
import { Button } from "~/components/ui/button";
import { I18nField } from "./components/i18nField";
import { type RestaurantFormData, restaurantSchema } from "./schema";

interface RestaurantFormProps {
	defaultValues?: Partial<RestaurantFormData>;
	onSubmit: (data: RestaurantFormData) => void;
	isPending: boolean;
}

export function RestaurantForm({ defaultValues, onSubmit, isPending }: RestaurantFormProps) {
	const { control, handleSubmit } = useForm<RestaurantFormData, unknown, RestaurantFormData>({
		resolver: zodResolver(restaurantSchema),
		defaultValues,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
			<I18nField control={control} baseName="name" label="Nomi *" />
			<I18nField control={control} baseName="description" label="Tavsif (ixtiyoriy)" />
			<I18nField control={control} baseName="address" label="Manzil (ixtiyoriy)" />

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<FormInput control={control} name="phone" label="Telefon" placeholder="+998901234567" />
				<FormInput
					control={control}
					name="email"
					label="Email"
					type="email"
					placeholder="info@restaurant.uz"
				/>
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<FormFileUploader control={control} name="logoUrl" label="Logo" hint="PNG, JPG — 1:1" />
				<FormFileUploader
					control={control}
					name="bannerUrl"
					label="Banner"
					hint="PNG, JPG — 16:9"
				/>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<FormInput control={control} name="workingHoursStart" label="Ish boshlanish" type="time" />
				<FormInput control={control} name="workingHoursEnd" label="Ish tugash" type="time" />
			</div>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
				<FormInput
					control={control}
					name="deliveryFee"
					label="Yetkazib berish narxi"
					type="number"
					placeholder="0"
				/>
				<FormInput
					control={control}
					name="minOrderAmount"
					label="Min buyurtma"
					type="number"
					placeholder="0"
				/>
				<FormInput
					control={control}
					name="averageDeliveryTime"
					label="O'rt. vaqt (min)"
					type="number"
					placeholder="30"
				/>
			</div>

			{/* Mobile submit — hidden on xl (sidebar has button) */}
			<Button type="submit" loading={isPending} className="mt-1 xl:hidden">
				Saqlash
			</Button>
		</form>
	);
}
