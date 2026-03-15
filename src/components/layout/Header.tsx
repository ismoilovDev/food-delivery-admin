import { LogOut, Menu, User } from "lucide-react";
import { useLocation } from "react-router";
import { useAuthStore } from "~/store/authStore";

const ROUTE_LABELS: Record<string, string> = {
	"/dashboard": "Dashboard",
	"/restaurants": "Restaurants",
	"/categories": "Categories",
	"/products": "Products",
	"/orders": "Orders",
	"/couriers": "Couriers",
	"/users": "Users",
	"/reviews": "Reviews",
	"/promocodes": "Promocodes",
	"/notifications": "Notifications",
};

interface HeaderProps {
	onMenuOpen: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
	const { pathname } = useLocation();
	const { user, logout } = useAuthStore();

	const pageTitle = ROUTE_LABELS[pathname] ?? "Admin Panel";

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
			<div className="flex items-center gap-3">
				{/* Hamburger — only on mobile/tablet */}
				<button
					type="button"
					onClick={onMenuOpen}
					className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
					aria-label="Open menu"
				>
					<Menu size={20} />
				</button>
				<h1 className="text-base font-semibold text-gray-900 lg:text-lg">{pageTitle}</h1>
			</div>

			<div className="flex items-center gap-2 lg:gap-3">
				<div className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
					<User size={16} />
					<span>{user?.username ?? "Admin"}</span>
				</div>
				<button
					type="button"
					onClick={logout}
					className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:px-3"
				>
					<LogOut size={15} />
					<span className="hidden sm:inline">Logout</span>
				</button>
			</div>
		</header>
	);
}
