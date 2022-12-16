import React, { useState } from "react";
import { Button } from "@mui/material";
import { gamePreparingScreen } from "../../../../common/localization";
import { gameService } from "../../../../services";
import { observer } from "mobx-react-lite";
import { stores } from "../../../../store";
import { SelectGameRealmDialog } from "./SelectGameRealmDialog";
import { useSnackbar } from "notistack";
import { suspenseServiceError } from "../../../../common/utils";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../common/constants";

const userStore = stores.user;
const gameStore = stores.currentGame;

export const PlayerActions = observer(({ player, selectedRealm = null }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [isSelectRealmDialogOpen, setIsSelectRealmDialogOpen] = useState(false);

    const handleSelectRealm = () => {
        setIsSelectRealmDialogOpen(true);
    };
    const handleStartGame = suspenseServiceError(
        async () => {
            await gameService.startGame();
            navigate(routes.game);
        },
        { notify: enqueueSnackbar }
    );

    const handleSelectRealmDialogClose = suspenseServiceError(
        async (realm) => {
            setIsSelectRealmDialogOpen(false);
            if (realm === null) {
                return;
            }

            await gameService.selectRealm(realm);
        },
        { notify: enqueueSnackbar }
    );

    const currentGame = gameStore.info;
    const isPlayerCurrentUser = userStore.user.id === player.id;
    const isPlayerOwner = currentGame.playerOwnerId === userStore.user.id;
    const playersExceptOwner = currentGame.players.filter((p) => p.isOwner === false);

    const actionPermissions = {
        canReady: isPlayerCurrentUser && isPlayerOwner === false && player.isReady === false,
        isReadyDisabled: selectedRealm === null,
        canUnready: isPlayerCurrentUser && isPlayerOwner === false && player.isReady,
        canStart: isPlayerCurrentUser && isPlayerOwner,
        isStartDisabled: !(
            playersExceptOwner.length > 0 &&
            playersExceptOwner.every((p) => p.isReady) &&
            selectedRealm !== null
        ),
        canSelectRealm: isPlayerCurrentUser,
        canLeave: isPlayerCurrentUser,
        canKick: isPlayerCurrentUser === false && isPlayerOwner,
    };

    return (
        <>
            {actionPermissions.canStart && (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={actionPermissions.isStartDisabled}
                    onClick={handleStartGame}
                >
                    {gamePreparingScreen.playerBox.actions.start}
                </Button>
            )}
            {actionPermissions.canReady && (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={actionPermissions.isReadyDisabled}
                    onClick={gameService.playerReady}
                >
                    {gamePreparingScreen.playerBox.actions.ready}
                </Button>
            )}
            {actionPermissions.canUnready && (
                <Button size="small" variant="contained" color="error" onClick={gameService.playerNotReady}>
                    {gamePreparingScreen.playerBox.actions.unready}
                </Button>
            )}
            {actionPermissions.canSelectRealm && (
                <Button size="small" variant="outlined" onClick={handleSelectRealm}>
                    {gamePreparingScreen.playerBox.actions.selectRealm}
                </Button>
            )}
            {actionPermissions.canLeave && (
                <Button size="small" variant="outlined" color="error" onClick={gameService.leaveGame}>
                    {gamePreparingScreen.playerBox.actions.leave}
                </Button>
            )}
            {actionPermissions.canKick && (
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    type="error"
                    onClick={() => gameService.kickPlayer({ playerId: player.id })}
                >
                    {gamePreparingScreen.playerBox.actions.kick}
                </Button>
            )}
            <SelectGameRealmDialog
                isOpen={isSelectRealmDialogOpen}
                selectedValue={null}
                onClose={handleSelectRealmDialogClose}
            />
        </>
    );
});
