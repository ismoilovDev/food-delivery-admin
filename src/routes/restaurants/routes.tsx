import { lazy } from "react";
import type { RouteObject } from "react-router";

const RestaurantsPage = lazy(() => import("./page"));
const RestaurantFormPage = lazy(() => import("./pages/form/page"));

export const restaurantRoutes: RouteObject[] = [
	{ path: "restaurants", element: <RestaurantsPage /> },
	{ path: "restaurants/new", element: <RestaurantFormPage /> },
	{ path: "restaurants/:id/edit", element: <RestaurantFormPage /> },
];
