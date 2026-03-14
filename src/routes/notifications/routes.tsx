import { lazy } from "react";
import type { RouteObject } from "react-router";

const NotificationsPage = lazy(() =>
	import("./NotificationsPage").then((m) => ({ default: m.NotificationsPage })),
);

export const notificationRoutes: RouteObject[] = [
	{ path: "notifications", element: <NotificationsPage /> },
];
