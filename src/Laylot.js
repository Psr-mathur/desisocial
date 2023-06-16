import React from "react";
import Navbar from "./Bar-components/navbar";
import Leftbar from "./Bar-components/leftbar";
import Rightbar from "./Bar-components/rightbar";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Laylot = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Navbar />
                <div style={{ display: "flex" }}>
                    <Leftbar />
                    <div style={{ flex: 3 }}>
                        <Outlet />
                    </div>
                    <Rightbar />
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default Laylot;
