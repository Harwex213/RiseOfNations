import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { gamesScreen } from "../../../common/localization";
import { observer } from "mobx-react-lite";
import LoadingButton from "@mui/lab/LoadingButton";
import { PlayerAvatar } from "./PlayerAvatar";

export const Game = observer(({ game, isTryingToJoin, onJoin, ...props }) => {
    return (
        <Paper elevation={1} {...props} sx={{ p: 2, ...props.sx }}>
            <Stack spacing={1} sx={{ width: "100%", height: "100%" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Typography variant="h6">{game.name}</Typography>
                    <Typography variant="h5" color="text.secondary" ml={2}>
                        {game.players.length} / {game.playersAmount}
                    </Typography>
                    <LoadingButton
                        type="button"
                        variant="contained"
                        color="success"
                        sx={{ width: 150, m: "auto 0", ml: "auto" }}
                        loading={isTryingToJoin}
                        onClick={() => onJoin(game)}
                        disabled={game.players.length === game.playersAmount}
                    >
                        {gamesScreen.gameList.actions.joinGame}
                    </LoadingButton>
                </Stack>
                <Grid2 container gap={2}>
                    {game.players.map((player) => (
                        <Grid2 item key={player.id}>
                            <PlayerAvatar player={player} />
                        </Grid2>
                    ))}
                </Grid2>
            </Stack>
        </Paper>
    );
});
