import { lazy } from "react";
import type { RouteObject } from "react-router";

const CategoriesPage = lazy(() =>
	import("./CategoriesPage").then((m) => ({ default: m.CategoriesPage })),
);

export const categoryRoutes: RouteObject[] = [
	{ path: "categories", element: <CategoriesPage /> },
];
