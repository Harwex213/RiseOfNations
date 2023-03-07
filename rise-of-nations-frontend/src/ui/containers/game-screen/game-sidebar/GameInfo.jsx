import React, { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { gamePreparingScreen, gameScreen } from "../../../../common/localization";
import { LoadingButton } from "@mui/lab";
import { gameService } from "../../../../services";
import { stores } from "../../../../store";

const currentGame = stores.currentGame;

export const GameInfo = observer(({ ...props }) => {
    const model = currentGame.model;
    const currentTurn = model.currentTurn;
    const userCountry = model.countries[currentGame.userCountryIndex];

    return (
        <Paper elevation={1} {...props} sx={{ p: 2, ...props.sx }}>
            <Stack spacing={1}>
                <Stack direction="row">
                    <Typography variant="h4">
                        {gameScreen.gameInfo.turn} {currentTurn}
                    </Typography>
                    <LoadingButton
                        variant="contained"
                        color="success"
                        sx={{ ml: "auto" }}
                        disabled={currentGame.isUserTurn === false || currentGame.isGameFinished}
                        onClick={gameService.endTurn}
                    >
                        {gameScreen.gameInfo.endTurnAction}
                    </LoadingButton>
                </Stack>
                <Divider />
                <Stack>
                    {currentGame.isUserTurn &&
                        currentGame.isGameFinished === false &&
                        currentGame.isUserDefeated === false && (
                            <Typography variant="subtitle1">Timer: {stores.ui.gameTimer}</Typography>
                        )}
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Now turn is:</Typography>
                        <Typography variant="subtitle1" color="warning.light">
                            {currentGame.info.players[model.currentTurnPlayerIndex].username}
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1">
                        {gameScreen.gameInfo.treasure} {userCountry.treasure}
                    </Typography>
                    <Typography variant="subtitle1">
                        {gameScreen.gameInfo.income} {userCountry.currentIncome}
                    </Typography>
                </Stack>{" "}
                <Button size="small" variant="outlined" color="error" onClick={gameService.leaveGame}>
                    {gamePreparingScreen.playerBox.actions.leave}
                </Button>
            </Stack>
        </Paper>
    );
});
