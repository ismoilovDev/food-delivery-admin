import { LogOut, User } from "lucide-react";
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

export function Header() {
	const { pathname } = useLocation();
	const { user, logout } = useAuthStore();

	const pageTitle = ROUTE_LABELS[pathname] ?? "Admin Panel";

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			<h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>

			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<User size={16} />
					<span>{user?.username ?? "Admin"}</span>
				</div>
				<button
					type="button"
					onClick={logout}
					className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
				>
					<LogOut size={15} />
					<span>Logout</span>
				</button>
			</div>
		</header>
	);
}
