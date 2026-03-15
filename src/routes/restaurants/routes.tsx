import { lazy } from "react";
import type { RouteObject } from "react-router";
import { DeleteModal } from "./pages/delete/modal";

const RestaurantsPage = lazy(() => import("./page"));
const RestaurantFormPage = lazy(() => import("./pages/form/page"));

export const restaurantRoutes: RouteObject[] = [
	{
		path: "restaurants",
		element: <RestaurantsPage />,
		children: [{ path: ":id/delete", element: <DeleteModal /> }],
	},
	{ path: "restaurants/new", element: <RestaurantFormPage /> },
	{ path: "restaurants/:id/edit", element: <RestaurantFormPage /> },
];
