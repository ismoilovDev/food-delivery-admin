import { lazy } from "react";
import type { RouteObject } from "react-router";
import { DeleteModal } from "./pages/delete/modal";

const CategoriesPage = lazy(() => import("./page"));
const CategoryFormPage = lazy(() => import("./pages/form/page"));

export const categoryRoutes: RouteObject[] = [
	{
		path: "categories",
		element: <CategoriesPage />,
		children: [{ path: ":id/delete", element: <DeleteModal /> }],
	},
	{ path: "categories/new", element: <CategoryFormPage /> },
	{ path: "categories/:id/edit", element: <CategoryFormPage /> },
];
