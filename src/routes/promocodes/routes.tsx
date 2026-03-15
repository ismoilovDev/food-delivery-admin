import { lazy } from "react";
import type { RouteObject } from "react-router";

const PromocodesPage = lazy(() => import("./promocodesPage"));

export const promocodeRoutes: RouteObject[] = [{ path: "promocodes", element: <PromocodesPage /> }];
