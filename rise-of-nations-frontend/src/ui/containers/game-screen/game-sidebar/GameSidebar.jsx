import React from "react";
import { observer } from "mobx-react-lite";
import { Stack } from "@mui/material";
import { GameChat } from "../../game-chat/GameChat";
import { GameInfo } from "./GameInfo";
import { stores } from "../../../../store";

const currentGame = stores.currentGame;

export const GameSidebar = observer(() => {
    return (
        <Stack spacing={1} sx={{ height: "100%" }}>
            {currentGame.isModelSet && <GameInfo />}
            <GameChat sx={{ height: "100%" }} />
        </Stack>
    );
});
