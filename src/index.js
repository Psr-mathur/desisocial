import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
// import { BASE_API } from "./vars";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </HashRouter>
    </React.StrictMode>
);
