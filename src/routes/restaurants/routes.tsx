import { lazy } from "react";
import type { RouteObject } from "react-router";

const RestaurantsPage = lazy(() => import("./page"));

export const restaurantRoutes: RouteObject[] = [
	{ path: "restaurants", element: <RestaurantsPage /> },
];
