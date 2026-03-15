import { lazy } from "react";
import type { RouteObject } from "react-router";

const NotificationsPage = lazy(() => import("./notificationsPage"));

export const notificationRoutes: RouteObject[] = [
	{ path: "notifications", element: <NotificationsPage /> },
];
