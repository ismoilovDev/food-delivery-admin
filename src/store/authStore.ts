import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAccessToken } from "~/lib/api/client";

interface User {
	id: number;
	username: string;
	userType: "ADMIN" | "SUPER_ADMIN";
}

interface AuthState {
	token: string | null;
	refreshToken: string | null;
	user: User | null;
	isAuthenticated: boolean;
	setTokens: (token: string, refreshToken: string) => void;
	setUser: (user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			refreshToken: null,
			user: null,
			isAuthenticated: false,

			setTokens: (token, refreshToken) => {
				setAccessToken(token);
				set({ token, refreshToken, isAuthenticated: true });
			},

			setUser: (user) => set({ user }),

			logout: () => {
				setAccessToken(null);
				set({ token: null, refreshToken: null, user: null, isAuthenticated: false });
			},
		}),
		{
			name: "auth-storage",
			onRehydrateStorage: () => (state) => {
				if (state?.token) {
					setAccessToken(state.token);
				}
			},
		},
	),
);
