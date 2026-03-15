import { lazy } from "react";
import type { RouteObject } from "react-router";

const ProductsPage = lazy(() => import("./productsPage"));

export const productRoutes: RouteObject[] = [{ path: "products", element: <ProductsPage /> }];
