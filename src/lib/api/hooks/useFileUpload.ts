import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/file";

export function useFileUpload() {
	return useMutation({
		mutationFn: (file: File) => uploadFile(file),
	});
}
