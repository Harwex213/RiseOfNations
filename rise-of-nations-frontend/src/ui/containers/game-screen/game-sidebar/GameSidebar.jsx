import React from "react";
import { observer } from "mobx-react-lite";
import { Stack } from "@mui/material";
import { GameChat } from "../../game-chat/GameChat";
import { GameInfo } from "./GameInfo";

export const GameSidebar = observer(() => {
    return (
        <Stack spacing={1} sx={{ height: "100%" }}>
            <GameInfo />
            <GameChat sx={{ height: "calc(100% - 196px)" }} />
        </Stack>
    );
});
