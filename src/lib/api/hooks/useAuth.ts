import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/authStore";
import { login } from "../services/auth";

export function useLogin() {
	const navigate = useNavigate();
	const { setTokens } = useAuthStore();

	return useMutation({
		mutationFn: login,
		onSuccess: (res) => {
			const { accessToken, refreshToken } = res.data ?? {};
			if (accessToken && refreshToken) {
				setTokens(accessToken, refreshToken);
				navigate("/dashboard");
			}
		},
	});
}
