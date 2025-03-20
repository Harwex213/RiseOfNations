import React, { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { stores } from "../../../../store";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { gamePreparingScreen } from "../../../../common/localization";
import { GameChat } from "../../game-chat/GameChat";
import { Player } from "./Player";
import { suspenseServiceError } from "../../../../common/utils";
import { realmsService } from "../../../../services";
import { useSnackbar } from "notistack";

const gameStore = stores.currentGame;

export const GamePreparing = observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    useLayoutEffect(() => {
        suspenseServiceError(
            async () => {
                await realmsService.getRealms();
            },
            { notify: enqueueSnackbar }
        )();
    }, [enqueueSnackbar]);

    const game = gameStore.info;

    return (
        <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
            <Box
                display="grid"
                gridTemplateRows="calc(25% - 12px) calc(25% - 12px) calc(25% - 12px) calc(25% - 12px)"
                rowGap={2}
                sx={{ width: "55%" }}
            >
                {[...new Array(game.playersAmount)].map((_, index) => (
                    <Player key={index} player={game.players[index]} />
                ))}
            </Box>
            <Stack spacing={2} sx={{ width: "45%" }}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="h5">{gamePreparingScreen.gameSettings.title}</Typography>
                        <Divider />
                        <Typography variant="subtitle1">
                            {gamePreparingScreen.gameSettings.name(game.name)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {gamePreparingScreen.gameSettings.playersAmount(game.playersAmount)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {gamePreparingScreen.gameSettings.turnDuration(game.turnDuration)}
                        </Typography>
                    </Stack>
                </Paper>
                <GameChat sx={{ height: "calc(100% - 200px)" }} />
            </Stack>
        </Stack>
    );
});
