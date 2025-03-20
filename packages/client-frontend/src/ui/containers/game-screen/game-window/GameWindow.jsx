import React from "react";
import { observer } from "mobx-react-lite";
import { CanvasContainer } from "./CanvasContainer";
import { Box, Paper } from "@mui/material";
import { GameWindowActions } from "./GameWindowActions";
import { stores } from "../../../../store";

export const GameWindow = observer(() => {
    return (
        <Box
            display="flex"
            sx={{ position: "relative", width: "100%", height: "100%", justifyContent: "center" }}
        >
            <Paper elevation={1} sx={{ position: "absolute", zIndex: 100, p: 2 }}>
                {stores.currentGame.isModelSet && <GameWindowActions />}
            </Paper>
            <CanvasContainer />
        </Box>
    );
});
