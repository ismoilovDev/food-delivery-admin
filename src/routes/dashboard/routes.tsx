import { lazy } from "react";
import type { RouteObject } from "react-router";

const DashboardPage = lazy(() => import("./DashboardPage"));

export const dashboardRoutes: RouteObject[] = [{ path: "dashboard", element: <DashboardPage /> }];
