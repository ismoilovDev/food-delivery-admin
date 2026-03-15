import { lazy } from "react";
import type { RouteObject } from "react-router";
import { DeleteModal } from "./pages/delete/modal";

const ProductsPage = lazy(() => import("./page"));
const ProductFormPage = lazy(() => import("./pages/form/page"));

export const productRoutes: RouteObject[] = [
	{
		path: "products",
		element: <ProductsPage />,
		children: [{ path: ":id/delete", element: <DeleteModal /> }],
	},
	{ path: "products/new", element: <ProductFormPage /> },
	{ path: "products/:id/edit", element: <ProductFormPage /> },
];
