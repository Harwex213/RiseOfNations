import React, { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { GameSidebar, GameWindow } from "../../containers";
import { gameService } from "../../../services";

export const GameScreen = () => {
    useLayoutEffect(() => {
        gameService.initializeGame();
    }, []);

    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
            sx={{ padding: 1, height: "100vh" }}
        >
            <Box gridColumn="span 3" sx={{ minHeight: "100%", maxHeight: "100%" }}>
                <GameSidebar />
            </Box>
            <Box gridColumn="span 9" sx={{ minHeight: "100%", maxHeight: "100%" }}>
                <GameWindow />
            </Box>
        </Box>
    );
};
