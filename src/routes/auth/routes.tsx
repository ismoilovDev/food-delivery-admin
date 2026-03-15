import { lazy } from "react";
import type { RouteObject } from "react-router";

const LoginPage = lazy(() => import("./loginPage"));

export const authRoutes: RouteObject[] = [{ path: "/login", element: <LoginPage /> }];
