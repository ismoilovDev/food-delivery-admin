import { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import { Layout } from "~/components/layout/Layout";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { authRoutes } from "~/routes/auth/routes";
import { categoryRoutes } from "~/routes/categories/routes";
import { courierRoutes } from "~/routes/couriers/routes";
import { dashboardRoutes } from "~/routes/dashboard/routes";
import { notificationRoutes } from "~/routes/notifications/routes";
import { orderRoutes } from "~/routes/orders/routes";
import { productRoutes } from "~/routes/products/routes";
import { promocodeRoutes } from "~/routes/promocodes/routes";
import { restaurantRoutes } from "~/routes/restaurants/routes";
import { reviewRoutes } from "~/routes/reviews/routes";
import { userRoutes } from "~/routes/users/routes";

const PageLoader = () => (
	<div className="flex h-full items-center justify-center">
		<div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
	</div>
);

export const router = createBrowserRouter([
	// Public routes
	...authRoutes,

	// Protected routes
	{
		element: <ProtectedRoute />,
		children: [
			{
				element: (
					<Suspense fallback={<PageLoader />}>
						<Layout />
					</Suspense>
				),
				children: [
					{ index: true, element: <Navigate to="/dashboard" replace /> },
					...dashboardRoutes,
					...restaurantRoutes,
					...categoryRoutes,
					...productRoutes,
					...orderRoutes,
					...courierRoutes,
					...userRoutes,
					...reviewRoutes,
					...promocodeRoutes,
					...notificationRoutes,
				],
			},
		],
	},

	{ path: "*", element: <Navigate to="/dashboard" replace /> },
]);
