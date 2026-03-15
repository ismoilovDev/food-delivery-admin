import {
	CheckCircle,
	Clock,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
	Truck,
	Users,
} from "lucide-react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { SectionCard } from "~/components/ui/SectionCard";
import { StatCard } from "~/components/ui/StatCard";
import {
	useDashboardOverview,
	useOrdersDistribution,
	useRevenueMonth,
	useTopCouriers,
	useTopProducts,
} from "~/lib/api/hooks/useDashboard";

const ORDER_STATUS_COLORS: Record<string, string> = {
	DELIVERED: "#22c55e",
	PENDING: "#f59e0b",
	PREPARING: "#3b82f6",
	IN_DELIVERY: "#8b5cf6",
	CANCELLED: "#ef4444",
	REJECTED: "#f43f5e",
	CONFIRMED: "#06b6d4",
	READY_FOR_DELIVERY: "#10b981",
	ASSIGNED_TO_COURIER: "#6366f1",
	PICKED_UP: "#a855f7",
};

function formatPrice(value?: number) {
	if (!value) return "0";
	return new Intl.NumberFormat("uz-UZ").format(value);
}

export default function DashboardPage() {
	const { data: overview, isLoading: overviewLoading } = useDashboardOverview();
	const { data: revenueMonth, isLoading: revenueLoading } = useRevenueMonth();
	const { data: distribution, isLoading: distLoading } = useOrdersDistribution();
	const { data: topProducts, isLoading: productsLoading } = useTopProducts(5);
	const { data: topCouriers, isLoading: couriersLoading } = useTopCouriers(5);

	const revenueChartData = Array.isArray(revenueMonth)
		? revenueMonth.map((r) => ({
				date: r.date ?? "",
				revenue: r.totalRevenue ?? 0,
				orders: r.orderCount ?? 0,
			}))
		: [];

	const distributionData = Array.isArray(distribution)
		? distribution.map((d) => ({
				name: d.statusName ?? d.status ?? "",
				value: d.count ?? 0,
				color: ORDER_STATUS_COLORS[d.status ?? ""] ?? "#94a3b8",
			}))
		: [];

	return (
		<div className="flex flex-col gap-6">
			{/* Stat cards row 1 */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Jami buyurtmalar"
					value={overview?.totalOrders ?? 0}
					icon={ShoppingCart}
					trend={{ value: overview?.todayOrders ?? 0, label: "bugun" }}
					color="orange"
					loading={overviewLoading}
				/>
				<StatCard
					label="Faol buyurtmalar"
					value={overview?.activeOrders ?? 0}
					icon={Clock}
					color="blue"
					loading={overviewLoading}
				/>
				<StatCard
					label="Bajarilgan"
					value={overview?.completedOrders ?? 0}
					icon={CheckCircle}
					color="green"
					loading={overviewLoading}
				/>
				<StatCard
					label="Foydalanuvchilar"
					value={overview?.totalUsers ?? 0}
					icon={Users}
					trend={{ value: overview?.newUsersToday ?? 0, label: "bugun yangi" }}
					color="purple"
					loading={overviewLoading}
				/>
			</div>

			{/* Stat cards row 2 */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard
					label="Kuryerlar"
					value={overview?.totalCouriers ?? 0}
					icon={Truck}
					color="blue"
					loading={overviewLoading}
				/>
				<StatCard
					label="Faol mahsulotlar"
					value={overview?.activeProducts ?? 0}
					icon={Package}
					color="orange"
					loading={overviewLoading}
				/>
				<StatCard
					label="Kategoriyalar"
					value={overview?.totalCategories ?? 0}
					icon={TrendingUp}
					color="purple"
					loading={overviewLoading}
				/>
				<StatCard
					label="Restoranlar"
					value={overview?.totalRestaurants ?? 0}
					icon={Star}
					color="green"
					loading={overviewLoading}
				/>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<SectionCard title="Oylik daromad" description="So'nggi 30 kun">
						{revenueLoading ? (
							<div className="h-64 animate-pulse rounded-lg bg-gray-100" />
						) : (
							<ResponsiveContainer width="100%" height={256}>
								<AreaChart data={revenueChartData}>
									<defs>
										<linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
											<stop offset="95%" stopColor="#f97316" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
									<XAxis
										dataKey="date"
										tick={{ fontSize: 11, fill: "#94a3b8" }}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										tick={{ fontSize: 11, fill: "#94a3b8" }}
										tickLine={false}
										axisLine={false}
										tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
									/>
									<Tooltip
										formatter={(value: number) => [`${formatPrice(value)} so'm`, "Daromad"]}
										contentStyle={{
											borderRadius: "8px",
											border: "1px solid #e2e8f0",
											fontSize: "12px",
										}}
									/>
									<Area
										type="monotone"
										dataKey="revenue"
										stroke="#f97316"
										strokeWidth={2}
										fill="url(#revenueGrad)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						)}
					</SectionCard>
				</div>

				<SectionCard title="Buyurtma holatlari">
					{distLoading ? (
						<div className="h-64 animate-pulse rounded-lg bg-gray-100" />
					) : (
						<ResponsiveContainer width="100%" height={256}>
							<PieChart>
								<Pie
									data={distributionData}
									cx="50%"
									cy="45%"
									innerRadius={60}
									outerRadius={90}
									paddingAngle={2}
									dataKey="value"
								>
									{distributionData.map((entry) => (
										<Cell key={entry.name} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										borderRadius: "8px",
										border: "1px solid #e2e8f0",
										fontSize: "12px",
									}}
								/>
								<Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
							</PieChart>
						</ResponsiveContainer>
					)}
				</SectionCard>
			</div>

			{/* Tables */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<SectionCard title="Top mahsulotlar" description="Eng ko'p buyurtma qilinganlar">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100">
									<th className="pb-3 text-left font-medium text-gray-500">#</th>
									<th className="pb-3 text-left font-medium text-gray-500">Mahsulot</th>
									<th className="pb-3 text-right font-medium text-gray-500">Buyurtma</th>
									<th className="pb-3 text-right font-medium text-gray-500">Daromad</th>
								</tr>
							</thead>
							<tbody>
								{productsLoading
									? Array.from({ length: 5 }).map((_, i) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
											<tr key={i} className="border-b border-gray-50">
												<td className="py-3">
													<div className="h-4 w-4 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3">
													<div className="h-4 w-32 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3 text-right">
													<div className="ml-auto h-4 w-10 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3 text-right">
													<div className="ml-auto h-4 w-16 animate-pulse rounded bg-gray-100" />
												</td>
											</tr>
										))
									: topProducts?.map((p, i) => (
											<tr key={p.productId} className="border-b border-gray-50 last:border-0">
												<td className="py-3 text-gray-400">{i + 1}</td>
												<td className="py-3">
													<div className="font-medium text-gray-900">{p.productName}</div>
													<div className="text-xs text-gray-400">{p.categoryName}</div>
												</td>
												<td className="py-3 text-right text-gray-700">{p.orderCount}</td>
												<td className="py-3 text-right font-medium text-gray-900">
													{formatPrice(p.totalRevenue)}
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				</SectionCard>

				<SectionCard title="Top kuryerlar" description="Eng ko'p yetkazib berganlar">
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-100">
									<th className="pb-3 text-left font-medium text-gray-500">#</th>
									<th className="pb-3 text-left font-medium text-gray-500">Kuryer</th>
									<th className="pb-3 text-right font-medium text-gray-500">Yetkazdi</th>
									<th className="pb-3 text-right font-medium text-gray-500">Reyting</th>
								</tr>
							</thead>
							<tbody>
								{couriersLoading
									? Array.from({ length: 5 }).map((_, i) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
											<tr key={i} className="border-b border-gray-50">
												<td className="py-3">
													<div className="h-4 w-4 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3">
													<div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3 text-right">
													<div className="ml-auto h-4 w-10 animate-pulse rounded bg-gray-100" />
												</td>
												<td className="py-3 text-right">
													<div className="ml-auto h-4 w-10 animate-pulse rounded bg-gray-100" />
												</td>
											</tr>
										))
									: topCouriers?.map((c, i) => (
											<tr key={c.courierId} className="border-b border-gray-50 last:border-0">
												<td className="py-3 text-gray-400">{i + 1}</td>
												<td className="py-3">
													<div className="font-medium text-gray-900">{c.courierName}</div>
													<div className="text-xs text-gray-400">{c.courierPhone}</div>
												</td>
												<td className="py-3 text-right text-gray-700">{c.completedDeliveries}</td>
												<td className="py-3 text-right">
													<span className="inline-flex items-center gap-1 font-medium text-amber-500">
														&#9733; {c.rating?.toFixed(1)}
													</span>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				</SectionCard>
			</div>
		</div>
	);
}
