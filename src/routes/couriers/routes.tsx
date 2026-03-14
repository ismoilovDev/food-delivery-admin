import { lazy } from "react";
import type { RouteObject } from "react-router";

const CouriersPage = lazy(() => import("./CouriersPage"));

export const courierRoutes: RouteObject[] = [{ path: "couriers", element: <CouriersPage /> }];
