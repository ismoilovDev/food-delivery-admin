import { lazy } from "react";
import type { RouteObject } from "react-router";

const ProductsPage = lazy(() =>
	import("./ProductsPage").then((m) => ({ default: m.ProductsPage })),
);

export const productRoutes: RouteObject[] = [
	{ path: "products", element: <ProductsPage /> },
];
