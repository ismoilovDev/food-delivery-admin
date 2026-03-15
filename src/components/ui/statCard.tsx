import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatCardProps {
	label: string;
	value: string | number;
	icon: LucideIcon;
	trend?: { value: number; label: string };
	color?: "orange" | "blue" | "green" | "purple" | "red";
	loading?: boolean;
}

const COLOR_MAP = {
	orange: { icon: "bg-orange-100 text-orange-600", trend: "text-orange-600" },
	blue: { icon: "bg-blue-100 text-blue-600", trend: "text-blue-600" },
	green: { icon: "bg-green-100 text-green-600", trend: "text-green-600" },
	purple: { icon: "bg-purple-100 text-purple-600", trend: "text-purple-600" },
	red: { icon: "bg-red-100 text-red-600", trend: "text-red-600" },
};

export function StatCard({
	label,
	value,
	icon: Icon,
	trend,
	color = "orange",
	loading = false,
}: StatCardProps) {
	const colors = COLOR_MAP[color];

	return (
		<div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<span className="text-sm text-gray-500">{label}</span>
					{loading ? (
						<div className="h-8 w-24 animate-pulse rounded-md bg-gray-100" />
					) : (
						<span className="text-2xl font-bold text-gray-900">{value}</span>
					)}
					{trend && !loading && (
						<span className={cn("text-xs font-medium", colors.trend)}>
							{trend.value > 0 ? "+" : ""}
							{trend.value} {trend.label}
						</span>
					)}
				</div>
				<div className={cn("rounded-xl p-3", colors.icon)}>
					<Icon size={20} />
				</div>
			</div>
		</div>
	);
}
