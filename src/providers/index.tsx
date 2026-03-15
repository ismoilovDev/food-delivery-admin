import type { ReactNode } from "react";
import { QueryProvider } from "./queryProvider";

interface AppProvidersProps {
	children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return <QueryProvider>{children}</QueryProvider>;
}
