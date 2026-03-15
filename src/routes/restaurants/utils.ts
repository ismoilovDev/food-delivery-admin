export function formatWorkingHours(start?: string, end?: string): string {
	if (!start || !end) return "—";
	return `${start} – ${end}`;
}

export function getRestaurantInitial(nameStr?: string, nameUz?: string): string {
	return ((nameStr ?? nameUz ?? "?")[0] ?? "?").toUpperCase();
}
