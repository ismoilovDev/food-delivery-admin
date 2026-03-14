import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Phone, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { useLogin } from "~/lib/api/hooks/useAuth";

const loginSchema = z.object({
	phone: z
		.string()
		.min(1, "Telefon raqam kiritilishi shart")
		.regex(/^\+998\d{9}$/, "Format: +998901234567"),
	password: z.string().min(1, "Parol kiritilishi shart").min(6, "Kamida 6 ta belgi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: loginMutate, isPending, error } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { phone: "+998", password: "" },
	});

	const onSubmit = (values: LoginFormValues) => {
		loginMutate(values);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
			<div className="w-full max-w-md">
				<div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100">
					{/* Logo */}
					<div className="mb-8 flex flex-col items-center gap-3">
						<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-200">
							<UtensilsCrossed size={28} className="text-white" />
						</div>
						<div className="text-center">
							<h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
							<p className="mt-1 text-sm text-gray-500">Admin paneliga kirish</p>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<Input
							label="Telefon raqam"
							type="tel"
							placeholder="+998901234567"
							leftIcon={<Phone size={16} />}
							error={errors.phone?.message}
							{...register("phone")}
						/>

						<Input
							label="Parol"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							leftIcon={<Lock size={16} />}
							rightIcon={
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									className="text-gray-400 hover:text-gray-600"
									tabIndex={-1}
								>
									{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
								</button>
							}
							error={errors.password?.message}
							{...register("password")}
						/>

						{error && (
							<div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3">
								<p className="text-sm text-red-600">
									{error instanceof Error ? error.message : "Xatolik yuz berdi"}
								</p>
							</div>
						)}

						<Button type="submit" loading={isPending} className="mt-2 w-full" size="lg">
							Kirish
						</Button>
					</form>
				</div>

				<p className="mt-6 text-center text-xs text-gray-400">
					© {new Date().getFullYear()} Food Delivery. Barcha huquqlar himoyalangan.
				</p>
			</div>
		</div>
	);
}
