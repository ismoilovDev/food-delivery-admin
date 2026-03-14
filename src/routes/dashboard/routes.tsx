import { lazy } from "react";
import type { RouteObject } from "react-router";

const DashboardPage = lazy(() =>
	import("./DashboardPage").then((m) => ({ default: m.DashboardPage })),
);

export const dashboardRoutes: RouteObject[] = [
	{ path: "dashboard", element: <DashboardPage /> },
];
