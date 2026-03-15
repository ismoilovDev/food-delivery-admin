import { lazy } from "react";
import type { RouteObject } from "react-router";

const CouriersPage = lazy(() => import("./couriersPage"));

export const courierRoutes: RouteObject[] = [{ path: "couriers", element: <CouriersPage /> }];
