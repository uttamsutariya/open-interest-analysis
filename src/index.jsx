import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OiContextProvider from "./context/OiContext.jsx";
import "./index.css";

const theme = createTheme({
	typography: {
		fontFamily: `"Rubik", sans-serif`,
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<OiContextProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</OiContextProvider>
	</React.StrictMode>
);
