import { lazy } from "react";
import type { RouteObject } from "react-router";

const CategoriesPage = lazy(() => import("./CategoriesPage"));

export const categoryRoutes: RouteObject[] = [
	{ path: "categories", element: <CategoriesPage /> },
];
