import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "~/components/layout/Layout";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { AppProviders } from "~/providers";
import { LoginPage } from "~/routes/auth/LoginPage";
import { CategoriesPage } from "~/routes/categories/CategoriesPage";
import { CouriersPage } from "~/routes/couriers/CouriersPage";
import { DashboardPage } from "~/routes/dashboard/DashboardPage";
import { NotificationsPage } from "~/routes/notifications/NotificationsPage";
import { OrdersPage } from "~/routes/orders/OrdersPage";
import { ProductsPage } from "~/routes/products/ProductsPage";
import { PromocodesPage } from "~/routes/promocodes/PromocodesPage";
import { RestaurantsPage } from "~/routes/restaurants/RestaurantsPage";
import { ReviewsPage } from "~/routes/reviews/ReviewsPage";
import { UsersPage } from "~/routes/users/UsersPage";

function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<Routes>
					{/* Public */}
					<Route path="/login" element={<LoginPage />} />

					{/* Protected */}
					<Route element={<ProtectedRoute />}>
						<Route element={<Layout />}>
							<Route index element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/restaurants" element={<RestaurantsPage />} />
							<Route path="/categories" element={<CategoriesPage />} />
							<Route path="/products" element={<ProductsPage />} />
							<Route path="/orders" element={<OrdersPage />} />
							<Route path="/couriers" element={<CouriersPage />} />
							<Route path="/users" element={<UsersPage />} />
							<Route path="/reviews" element={<ReviewsPage />} />
							<Route path="/promocodes" element={<PromocodesPage />} />
							<Route path="/notifications" element={<NotificationsPage />} />
						</Route>
					</Route>

					<Route path="*" element={<Navigate to="/dashboard" replace />} />
				</Routes>
			</BrowserRouter>
		</AppProviders>
	);
}

export default App;
