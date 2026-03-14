import {
	Bell,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	MessageSquare,
	Package,
	ShoppingBag,
	ShoppingCart,
	Tag,
	Truck,
	UtensilsCrossed,
	Users,
} from "lucide-react";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

const NAV_ITEMS = [
	{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
	{ to: "/categories", label: "Categories", icon: ShoppingBag },
	{ to: "/products", label: "Products", icon: Package },
	{ to: "/orders", label: "Orders", icon: ShoppingCart },
	{ to: "/couriers", label: "Couriers", icon: Truck },
	{ to: "/users", label: "Users", icon: Users },
	{ to: "/reviews", label: "Reviews", icon: MessageSquare },
	{ to: "/promocodes", label: "Promocodes", icon: Tag },
	{ to: "/notifications", label: "Notifications", icon: Bell },
];

interface SidebarProps {
	collapsed: boolean;
	onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
	return (
		<aside
			className={cn(
				"relative flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
				collapsed ? "w-16" : "w-60",
			)}
		>
			{/* Logo */}
			<div className="flex h-16 items-center border-b border-gray-200 px-4">
				{!collapsed && (
					<span className="text-lg font-bold text-orange-500">FoodAdmin</span>
				)}
			</div>

			{/* Nav */}
			<nav className="flex-1 overflow-y-auto py-4">
				<ul className="space-y-1 px-2">
					{NAV_ITEMS.map(({ to, label, icon: Icon }) => (
						<li key={to}>
							<NavLink
								to={to}
								className={({ isActive }) =>
									cn(
										"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
										isActive
											? "bg-orange-50 text-orange-600"
											: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
									)
								}
							>
								<Icon size={18} className="shrink-0" />
								{!collapsed && <span>{label}</span>}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			{/* Collapse toggle */}
			<button
				type="button"
				onClick={onToggle}
				className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
			>
				{collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
			</button>
		</aside>
	);
}
