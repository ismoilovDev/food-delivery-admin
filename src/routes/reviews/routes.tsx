import { lazy } from "react";
import type { RouteObject } from "react-router";

const ReviewsPage = lazy(() => import("./reviewsPage"));

export const reviewRoutes: RouteObject[] = [{ path: "reviews", element: <ReviewsPage /> }];
