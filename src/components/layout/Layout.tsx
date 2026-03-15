import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout() {
	const [collapsed, setCollapsed] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			<Sidebar
				collapsed={collapsed}
				onToggle={() => setCollapsed((v) => !v)}
				mobileOpen={mobileOpen}
				onMobileClose={() => setMobileOpen(false)}
			/>
			<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<Header onMenuOpen={() => setMobileOpen(true)} />
				<main className="flex-1 overflow-y-auto p-4 lg:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
