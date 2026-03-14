import { lazy } from "react";
import type { RouteObject } from "react-router";

const UsersPage = lazy(() => import("./UsersPage"));

export const userRoutes: RouteObject[] = [{ path: "users", element: <UsersPage /> }];
