import React from "react";
import { observer } from "mobx-react-lite";
import { Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export const FeaturedRealms = observer(() => {
    return (
        <Grid2 container spacing={1}>
            <Grid2 item xs={4}>
                <Paper elevation={3} sx={{ height: "300px" }}>
                    This is the game!
                </Paper>
            </Grid2>
            <Grid2 item xs={4}>
                <Paper elevation={3} sx={{ height: "300px" }}>
                    This is the game!
                </Paper>
            </Grid2>
            <Grid2 item xs={4}>
                <Paper elevation={3} sx={{ height: "300px" }}>
                    This is the game!
                </Paper>
            </Grid2>
        </Grid2>
    );
});
