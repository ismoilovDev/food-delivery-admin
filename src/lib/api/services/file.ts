import { apiClient } from "../client";
import type { components } from "../schema";

export type FileResDto = components["schemas"]["FileResDto"];

export async function uploadFile(file: File): Promise<FileResDto> {
	const { data, error } = await apiClient.POST("/api/file/upload", {
		body: { file: file as unknown as string },
		bodySerializer: () => {
			const fd = new FormData();
			fd.append("file", file);
			return fd;
		},
		headers: { "Content-Type": undefined },
	});
	if (error) throw error;
	if (!data?.data) throw new Error("Upload javobida fayl ma'lumoti yo'q");
	return data.data;
}
