import { lazy } from "react";
import type { RouteObject } from "react-router";

const NotificationsPage = lazy(() => import("./NotificationsPage"));

export const notificationRoutes: RouteObject[] = [
	{ path: "notifications", element: <NotificationsPage /> },
];
