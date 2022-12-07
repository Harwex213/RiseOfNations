import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./ui/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
);
