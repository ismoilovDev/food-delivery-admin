import { getAccessToken } from "../client";
import type { components } from "../schema";

export type FileResDto = components["schemas"]["FileResDto"];

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://food-delivery.uz";

export async function uploadFile(file: File): Promise<FileResDto> {
	const fd = new FormData();
	fd.append("file", file);

	const headers: HeadersInit = {};
	const token = getAccessToken();
	if (token) headers.Authorization = `Bearer ${token}`;

	const response = await fetch(`${BASE_URL}/api/file/upload`, {
		method: "POST",
		headers,
		body: fd,
	});

	const json = await response.json();

	if (!response.ok) throw json;
	if (!json?.data) throw new Error("Upload javobida fayl ma'lumoti yo'q");

	return json.data as FileResDto;
}
