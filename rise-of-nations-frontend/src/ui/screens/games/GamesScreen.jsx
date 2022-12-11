import * as React from "react";
import { Box } from "@mui/material";
import { GameList } from "../../containers";
import { Routes, Route } from "react-router-dom";
import { routes } from "../../../common/constants";

export const GamesScreen = () => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflowY: "hidden", p: 2, pb: 0 }}>
            <Routes>
                <Route path={routes.gamesNested.index} element={<GameList />} />
                {/*<Route path={routes.gamesNested.joinToGame} element={<GameList />} />*/}
            </Routes>
        </Box>
    );
};
