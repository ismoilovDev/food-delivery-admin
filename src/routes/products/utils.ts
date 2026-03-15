export function getProductInitial(nameUz?: string): string {
	return (nameUz ?? "?").charAt(0).toUpperCase();
}

export function formatPrice(price?: number): string {
	if (price == null) return "—";
	return new Intl.NumberFormat("uz-UZ").format(price);
}
