import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { cn } from "~/lib/utils";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-2xl",
};

export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
				onKeyDown={undefined}
				role="presentation"
			/>
			{/* Panel */}
			<div
				className={cn(
					"relative z-10 flex w-full flex-col rounded-2xl bg-white shadow-xl",
					SIZE_MAP[size],
					"max-h-[90vh]",
				)}
			>
				<div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
					<h2 className="text-base font-semibold text-gray-900">{title}</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					>
						<X size={18} />
					</button>
				</div>
				<div className="overflow-y-auto p-6">{children}</div>
			</div>
		</div>
	);
}
