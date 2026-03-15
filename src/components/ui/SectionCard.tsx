import type { ReactNode } from "react";

interface SectionCardProps {
	title: string;
	description?: string;
	action?: ReactNode;
	children: ReactNode;
}

export function SectionCard({ title, description, action, children }: SectionCardProps) {
	return (
		<div className="rounded-xl border border-gray-100 bg-white shadow-sm">
			<div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
				<div>
					<h2 className="text-sm font-semibold text-gray-900">{title}</h2>
					{description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
				</div>
				{action}
			</div>
			<div className="p-5">{children}</div>
		</div>
	);
}
