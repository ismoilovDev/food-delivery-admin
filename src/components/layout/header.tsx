import { LogOut, Menu } from "lucide-react";
import { useLocation } from "react-router";
import { useAuthStore } from "~/store/authStore";

const ROUTE_LABELS: Record<string, string> = {
	"/dashboard": "Dashboard",
	"/restaurants": "Restoranlar",
	"/restaurants/new": "Yangi restoran",
	"/categories": "Kategoriyalar",
	"/categories/new": "Yangi kategoriya",
	"/products": "Mahsulotlar",
	"/orders": "Buyurtmalar",
	"/couriers": "Kuryerlar",
	"/users": "Foydalanuvchilar",
	"/reviews": "Sharhlar",
	"/promocodes": "Promokodlar",
	"/notifications": "Bildirishnomalar",
};

function getPageTitle(pathname: string): string {
	if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
	if (pathname.match(/\/restaurants\/\d+\/edit/)) return "Restoranni tahrirlash";
	if (pathname.match(/\/categories\/\d+\/edit/)) return "Kategoriyani tahrirlash";
	return "Admin Panel";
}

function UserAvatar({ name }: { name: string }) {
	const initials = name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
			{initials || "A"}
		</div>
	);
}

interface HeaderProps {
	onMenuOpen: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
	const { pathname } = useLocation();
	const { user, logout } = useAuthStore();

	const pageTitle = getPageTitle(pathname);
	const username = user?.username ?? "Admin";

	return (
		<header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 lg:px-6">
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onMenuOpen}
					className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
					aria-label="Menyuni ochish"
				>
					<Menu size={20} />
				</button>
				<h1 className="text-base font-semibold text-gray-800 lg:text-[15px]">{pageTitle}</h1>
			</div>

			<div className="flex items-center gap-3">
				<div className="hidden items-center gap-2.5 sm:flex">
					<UserAvatar name={username} />
					<div className="hidden flex-col lg:flex">
						<span className="text-xs font-semibold text-gray-800">{username}</span>
						<span className="text-[10px] text-gray-400">Administrator</span>
					</div>
				</div>
				<div className="h-5 w-px bg-gray-200 hidden sm:block" />
				<button
					type="button"
					onClick={logout}
					className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
				>
					<LogOut size={14} />
					<span className="hidden sm:inline">Chiqish</span>
				</button>
			</div>
		</header>
	);
}
