import * as React from "react";
import { Box } from "@mui/material";
import { AuthenticatedAccess, GameList, GamePreparing } from "../../containers";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../../../common/constants";
import { NotInGameAccess } from "./NotInGameAccess";
import { InGamePreparingAccess } from "./InGamePreparingAccess";

export const GamesScreen = () => {
    return (
        <Box sx={{ width: "100%", height: "100%", overflowY: "hidden", pl: 2 }}>
            <Routes>
                <Route
                    path={routes.gamesNested.index}
                    element={
                        <NotInGameAccess>
                            <GameList />
                        </NotInGameAccess>
                    }
                />
                <Route
                    path={routes.gamesNested.preparing}
                    element={
                        <AuthenticatedAccess>
                            <InGamePreparingAccess>
                                <GamePreparing />
                            </InGamePreparingAccess>
                        </AuthenticatedAccess>
                    }
                />
                <Route path="*" element={<Navigate to={routes.gamesNested.index} replace={true} />} />
            </Routes>
        </Box>
    );
};
