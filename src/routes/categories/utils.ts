export function getCategoryInitial(nameStr?: string, fallback?: string): string {
	const name = nameStr ?? fallback ?? "?";
	return name.charAt(0).toUpperCase();
}
