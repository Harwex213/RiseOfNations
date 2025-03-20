import React from "react";
import { observer } from "mobx-react-lite";
import { Box, LinearProgress } from "@mui/material";
import { stores } from "../../../store";

export const FetchProgress = observer(() => {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "100%",
                display: stores.ui.isFetching ? "block" : "none",
            }}
        >
            <LinearProgress />
        </Box>
    );
});
