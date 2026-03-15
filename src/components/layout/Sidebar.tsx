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

const NAV_GROUPS = [
	{
		label: "Asosiy",
		items: [
			{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
			{ to: "/orders", label: "Buyurtmalar", icon: ShoppingCart },
		],
	},
	{
		label: "Katalog",
		items: [
			{ to: "/restaurants", label: "Restoranlar", icon: UtensilsCrossed },
			{ to: "/categories", label: "Kategoriyalar", icon: ShoppingBag },
			{ to: "/products", label: "Mahsulotlar", icon: Package },
		],
	},
	{
		label: "Foydalanuvchilar",
		items: [
			{ to: "/couriers", label: "Kuryerlar", icon: Truck },
			{ to: "/users", label: "Foydalanuvchilar", icon: Users },
		],
	},
	{
		label: "Boshqaruv",
		items: [
			{ to: "/reviews", label: "Sharhlar", icon: MessageSquare },
			{ to: "/promocodes", label: "Promokodlar", icon: Tag },
			{ to: "/notifications", label: "Bildirishnomalar", icon: Bell },
		],
	},
];

interface SidebarProps {
	collapsed: boolean;
	onToggle: () => void;
	mobileOpen: boolean;
	onMobileClose: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
	const isExpanded = !collapsed || mobileOpen;

	return (
		<>
			{/* Mobile backdrop */}
			{mobileOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 w-full cursor-default bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={onMobileClose}
					aria-label="Close sidebar"
				/>
			)}

			<aside
				className={cn(
					"flex h-screen flex-col bg-white transition-all duration-300",
					"border-r border-gray-100",
					// Desktop
					"lg:relative lg:translate-x-0",
					collapsed ? "lg:w-[68px]" : "lg:w-64",
					// Mobile drawer
					"fixed inset-y-0 left-0 z-50 w-72 lg:static",
					mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0",
				)}
			>
				{/* Logo */}
				<div
					className={cn(
						"flex h-16 items-center border-b border-gray-100 px-4",
						isExpanded ? "gap-3" : "justify-center",
					)}
				>
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500">
						<UtensilsCrossed size={16} className="text-white" />
					</div>
					{isExpanded && (
						<div>
							<p className="text-sm font-bold text-gray-900">FoodAdmin</p>
							<p className="text-[10px] text-gray-400">Boshqaruv paneli</p>
						</div>
					)}
					{/* Mobile close */}
					{mobileOpen && (
						<button
							type="button"
							onClick={onMobileClose}
							className="ml-auto rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
							aria-label="Close"
						>
							<X size={16} />
						</button>
					)}
				</div>

				{/* Nav */}
				<nav className="flex-1 overflow-y-auto py-3">
					{NAV_GROUPS.map((group) => (
						<div key={group.label} className="mb-1">
							{isExpanded && (
								<p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
									{group.label}
								</p>
							)}
							{!isExpanded && <div className="mx-3 my-2 h-px bg-gray-100" />}
							<ul className="space-y-0.5 px-2">
								{group.items.map(({ to, label, icon: Icon }) => (
									<li key={to}>
										<NavLink
											to={to}
											onClick={onMobileClose}
											title={!isExpanded ? label : undefined}
											className={({ isActive }) =>
												cn(
													"group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
													isActive
														? "bg-orange-50 text-orange-600"
														: "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
													!isExpanded && "justify-center px-2",
												)
											}
										>
											{({ isActive }) => (
												<>
													{isActive && (
														<span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
													)}
													<Icon
														size={18}
														className={cn("shrink-0", isActive ? "text-orange-500" : "")}
													/>
													{isExpanded && <span>{label}</span>}
												</>
											)}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				{/* Desktop collapse toggle */}
				<button
					type="button"
					onClick={onToggle}
					className="absolute -right-3 top-[72px] hidden h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors hover:bg-orange-50 hover:text-orange-500 lg:flex"
					aria-label={collapsed ? "Kengaytirish" : "Yig'ish"}
				>
					{collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
				</button>
			</aside>
		</>
	);
}
