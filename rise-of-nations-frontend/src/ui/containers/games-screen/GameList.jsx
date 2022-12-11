import React from "react";
import { Stack, Typography } from "@mui/material";
import { games } from "../../../common/localization";
import { Game } from "../../components";
import { CreateGame } from "./CreateGame";

export const GameList = () => {
    return (
        <Stack sx={{ height: "100%" }}>
            <Typography variant="h4">{games.gameList.pageTitle}</Typography>
            <Stack direction="row" spacing={2} sx={{ width: "100%", height: "calc(100% - 58px)", mt: 2 }}>
                <Stack spacing={2} sx={{ width: "50%", overflowY: "auto" }}>
                    {[...new Array(3)].map((_, index) => (
                        <Game key={index} />
                    ))}
                </Stack>
                <Stack sx={{ width: "50%", alignItems: "center" }}>
                    <Typography variant="subtitle1">{games.gameList.pageSubtitle}</Typography>
                    <CreateGame sx={{ width: "75%", height: "100%", m: "auto" }} />
                </Stack>
            </Stack>
        </Stack>
    );
};
