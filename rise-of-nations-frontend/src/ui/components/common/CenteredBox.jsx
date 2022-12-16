import React from "react";
import { Box } from "@mui/material";

export const CenteredBox = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
};
