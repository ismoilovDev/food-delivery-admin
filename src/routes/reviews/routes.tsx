import { lazy } from "react";
import type { RouteObject } from "react-router";

const ReviewsPage = lazy(() => import("./ReviewsPage"));

export const reviewRoutes: RouteObject[] = [{ path: "reviews", element: <ReviewsPage /> }];
