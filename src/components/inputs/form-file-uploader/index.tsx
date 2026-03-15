import { ImageIcon, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useId, useState } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { useFileUpload } from "~/lib/api/hooks/useFileUpload";
import { cn } from "~/lib/utils";

interface FormFileUploaderProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	accept?: string;
	hint?: string;
}

export function FormFileUploader<T extends FieldValues>({
	control,
	name,
	label,
	accept = "image/*",
	hint = "PNG, JPG, WEBP — max 5MB",
}: FormFileUploaderProps<T>) {
	const inputId = useId();
	const [isDragging, setIsDragging] = useState(false);
	const upload = useFileUpload();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const currentUrl = field.value as string | undefined;
				const isLoading = upload.isPending;

				function handleFile(file: File) {
					upload.mutate(file, {
						onSuccess: (res) => field.onChange(res.previewURL ?? res.downloadURL ?? ""),
					});
				}

				function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
					const file = e.target.files?.[0];
					if (file) handleFile(file);
					e.target.value = "";
				}

				function handleDrop(e: React.DragEvent) {
					e.preventDefault();
					setIsDragging(false);
					if (isLoading) return;
					const file = e.dataTransfer.files?.[0];
					if (file) handleFile(file);
				}

				function handleDragOver(e: React.DragEvent) {
					e.preventDefault();
					setIsDragging(true);
				}

				function handleDragLeave() {
					setIsDragging(false);
				}

				function handleClear(e: React.MouseEvent) {
					e.preventDefault();
					field.onChange("");
				}

				return (
					<div className="flex flex-col gap-1.5">
						{label && <span className="text-sm font-medium text-gray-700">{label}</span>}

						{/* Relative wrapper: label is the drop zone, trash floats on top */}
						<div className="relative">
							{/* Label = semantic click zone + drag target */}
							<label
								htmlFor={inputId}
								onDrop={handleDrop}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								className={cn(
									"flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed transition-colors",
									isDragging
										? "border-orange-400 bg-orange-50"
										: "border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/40",
									fieldState.error && "border-red-400 bg-red-50",
									isLoading && "cursor-not-allowed opacity-70",
								)}
							>
								{/* Image preview */}
								{currentUrl && !isLoading && (
									<>
										<img
											src={currentUrl}
											alt="preview"
											className="absolute inset-0 h-full w-full object-cover"
										/>
										<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 opacity-0 transition-all hover:bg-black/40 hover:opacity-100">
											<UploadCloud size={22} className="text-white" />
											<span className="text-xs font-medium text-white">Almashtirish</span>
										</div>
									</>
								)}

								{/* Loading */}
								{isLoading && (
									<div className="flex flex-col items-center gap-2 text-orange-500">
										<Loader2 size={28} className="animate-spin" />
										<span className="text-xs font-medium">Yuklanmoqda...</span>
									</div>
								)}

								{/* Empty state */}
								{!currentUrl && !isLoading && (
									<div className="flex flex-col items-center gap-2 px-4 text-center">
										<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
											<ImageIcon size={20} />
										</div>
										<div>
											<p className="text-sm font-medium text-gray-600">
												Fayl tanlash yoki tashlash
											</p>
											{hint && <p className="mt-0.5 text-xs text-gray-400">{hint}</p>}
										</div>
									</div>
								)}
							</label>

							{/* Trash — outside label to avoid nested interactive elements */}
							{currentUrl && !isLoading && (
								<button
									type="button"
									onClick={handleClear}
									className="absolute top-2 right-2 z-10 rounded-lg bg-white/90 p-1.5 text-gray-600 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600"
									title="O'chirish"
								>
									<Trash2 size={14} />
								</button>
							)}
						</div>

						{upload.isError && (
							<p className="text-xs text-red-500">
								Yuklashda xatolik: {(upload.error as Error)?.message ?? "Noma'lum xato"}
							</p>
						)}

						{fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}

						<input
							id={inputId}
							type="file"
							accept={accept}
							disabled={isLoading}
							className="hidden"
							onChange={handleInputChange}
						/>
					</div>
				);
			}}
		/>
	);
}
