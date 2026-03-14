import { lazy } from "react";
import type { RouteObject } from "react-router";

const RestaurantsPage = lazy(() =>
	import("./RestaurantsPage").then((m) => ({ default: m.RestaurantsPage })),
);

export const restaurantRoutes: RouteObject[] = [
	{ path: "restaurants", element: <RestaurantsPage /> },
];
