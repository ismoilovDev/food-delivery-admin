import { lazy } from "react";
import type { RouteObject } from "react-router";

const OrdersPage = lazy(() =>
	import("./OrdersPage").then((m) => ({ default: m.OrdersPage })),
);

export const orderRoutes: RouteObject[] = [
	{ path: "orders", element: <OrdersPage /> },
];
