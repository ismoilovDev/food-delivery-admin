import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppProviders } from "~/providers";

function App() {
	return (
		<AppProviders>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<div>Login page</div>} />
					<Route path="/" element={<Navigate to="/login" replace />} />
				</Routes>
			</BrowserRouter>
		</AppProviders>
	);
}

export default App;
