import * as React from "react";
import { Menu } from "./Menu";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
            sx={{ padding: 1, height: "100vh" }}
        >
            <Box gridColumn="span 2">
                <Menu />
            </Box>
            <Box gridColumn="span 10" sx={{ minHeight: "100%", maxHeight: "100%" }}>
                {children}
            </Box>
        </Box>
    );
};
