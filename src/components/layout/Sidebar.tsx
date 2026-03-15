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
	Users,
	UtensilsCrossed,
	X,
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
	mobileOpen: boolean;
	onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
	return (
		<>
			{/* Mobile backdrop */}
			{mobileOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 w-full cursor-default bg-black/40 backdrop-blur-sm lg:hidden"
					onClick={onMobileClose}
					aria-label="Close sidebar"
				/>
			)}

			<aside
				className={cn(
					// Base
					"flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
					// Desktop: always visible, collapsible
					"lg:relative lg:translate-x-0",
					collapsed ? "lg:w-16" : "lg:w-60",
					// Mobile: fixed drawer
					"fixed inset-y-0 left-0 z-50 w-72 lg:static",
					mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0",
				)}
			>
				{/* Logo */}
				<div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
					{(!collapsed || mobileOpen) && (
						<span className="text-lg font-bold text-orange-500">FoodAdmin</span>
					)}
					{/* Mobile close button */}
					<button
						type="button"
						onClick={onMobileClose}
						className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
						aria-label="Close menu"
					>
						<X size={18} />
					</button>
				</div>

				{/* Nav */}
				<nav className="flex-1 overflow-y-auto py-4">
					<ul className="space-y-1 px-2">
						{NAV_ITEMS.map(({ to, label, icon: Icon }) => (
							<li key={to}>
								<NavLink
									to={to}
									onClick={onMobileClose}
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
									{(!collapsed || mobileOpen) && <span>{label}</span>}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{/* Desktop collapse toggle */}
				<button
					type="button"
					onClick={onToggle}
					className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 lg:flex"
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
				</button>
			</aside>
		</>
	);
}
