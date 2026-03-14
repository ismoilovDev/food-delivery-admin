import type { components } from "../schema.d.ts";

// --- Core schema types (auto-generated) ---
export type ApiErrorData = components["schemas"]["ErrorData"];
export type PageableRes = components["schemas"]["PageableRes"];

// --- Domain DTOs ---
export type TokenDto = components["schemas"]["TokenDto"];
export type UserProfileDto = components["schemas"]["UserProfileDto"];
export type UpdateProfileReqDto = components["schemas"]["UpdateProfileReqDto"];
export type ChangePasswordReqDto = components["schemas"]["ChangePasswordReqDto"];

export type CategoryDto = components["schemas"]["CategoryDto"];
export type CategoryReqDto = components["schemas"]["CategoryReqDto"];
export type CategoryResMiniDto = components["schemas"]["CategoryResMiniDto"];
export type CategoryCriteria = components["schemas"]["CategoryCriteria"];

export type ProductDto = components["schemas"]["ProductDto"];
export type ProductReqDto = components["schemas"]["ProductReqDto"];
export type ProductResMiniDto = components["schemas"]["ProductResMiniDto"];

export type RestaurantDto = components["schemas"]["RestaurantDto"];
export type RestaurantReqDto = components["schemas"]["RestaurantReqDto"];
export type RestaurantResMiniDto = components["schemas"]["RestaurantResMiniDto"];
export type RestaurantCriteria = components["schemas"]["RestaurantCriteria"];

export type OrderDto = components["schemas"]["OrderDto"];
export type OrderReqDto = components["schemas"]["OrderReqDto"];
export type OrderResMiniDto = components["schemas"]["OrderResMiniDto"];
export type OrderCriteria = components["schemas"]["OrderCriteria"];
export type OrderItemDto = components["schemas"]["OrderItemDto"];

export type CourierDto = components["schemas"]["CourierDto"];
export type CourierReqDto = components["schemas"]["CourierReqDto"];
export type CourierResMiniDto = components["schemas"]["CourierResMiniDto"];
export type CourierCriteria = components["schemas"]["CourierCriteria"];
export type CourierStatsDto = components["schemas"]["CourierStatsDto"];

export type CartDto = components["schemas"]["CartDto"];
export type CartItemDto = components["schemas"]["CartItemDto"];
export type CartItemReqDto = components["schemas"]["CartItemReqDto"];

export type DeliveryAddressDto = components["schemas"]["DeliveryAddressDto"];
export type DeliveryAddressReqDto = components["schemas"]["DeliveryAddressReqDto"];

export type ReviewDto = components["schemas"]["ReviewDto"];
export type ReviewReqDto = components["schemas"]["ReviewReqDto"];
export type ReviewResMiniDto = components["schemas"]["ReviewResMiniDto"];
export type ReviewCriteria = components["schemas"]["ReviewCriteria"];

export type PromocodeDto = components["schemas"]["PromocodeDto"];
export type PromocodeReqDto = components["schemas"]["PromocodeReqDto"];
export type PromocodeCriteria = components["schemas"]["PromocodeCriteria"];

export type NotificationDto = components["schemas"]["NotificationDto"];
export type NotificationReqDto = components["schemas"]["NotificationReqDto"];
export type NotificationCriteria = components["schemas"]["NotificationCriteria"];

export type PaymentDto = components["schemas"]["PaymentDto"];

// --- Dashboard ---
export type DashboardOverviewDto = components["schemas"]["DashboardOverviewDto"];
export type RevenueStatsDto = components["schemas"]["RevenueStatsDto"];
export type TopProductDto = components["schemas"]["TopProductDto"];
export type TopCourierDto = components["schemas"]["TopCourierDto"];
export type OrderStatusDistributionDto = components["schemas"]["OrderStatusDistributionDto"];

// --- Auth ---
export type LoginReqDto = components["schemas"]["LoginReqDto"];

// --- Shared ---
export type I18nText = {
	uz: string;
	ru: string;
	en: string;
};

export type Language = "UZ" | "RU" | "EN";
