import { lazy } from "react";
import type { RouteObject } from "react-router";

const OrdersPage = lazy(() => import("./OrdersPage"));

export const orderRoutes: RouteObject[] = [
	{ path: "orders", element: <OrdersPage /> },
];
