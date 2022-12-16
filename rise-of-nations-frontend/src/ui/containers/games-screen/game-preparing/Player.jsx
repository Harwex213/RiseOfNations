import React from "react";
import { observer } from "mobx-react-lite";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { staticApiRoutes } from "../../../../common/constants";
import { gamePreparingScreen } from "../../../../common/localization";
import { CenteredBox, PlayerAvatar } from "../../../components";
import { stores } from "../../../../store";
import { PlayerActions } from "./PlayerActions";

const gameStore = stores.currentGame;
const userStore = stores.user;

const UnconnectedPlayer = observer(() => {
    return (
        <CenteredBox>
            <Typography variant="h4">{gamePreparingScreen.playerBox.waitingForPlayer}</Typography>
        </CenteredBox>
    );
});

const ConnectedPlayer = observer(({ player }) => {
    const getPlayerRealm = (player) => {
        if (userStore.user.id === player.id) {
            return userStore.getRealm(player.selectedRealmId);
        }

        return gameStore.getPlayerRealm(player.id);
    };

    const selectedRealm = player.selectedRealmId === null ? null : getPlayerRealm(player);
    const flagUrl =
        selectedRealm !== null && selectedRealm.flagExtension !== null
            ? `${staticApiRoutes.realmImages}/${selectedRealm.flagId + selectedRealm.flagExtension}`
            : staticApiRoutes.defaultRealmImage;
    const modificator = selectedRealm
        ? stores.globalGameInfo.getModificator(selectedRealm.modificatorId)
        : null;

    return (
        <Stack direction="row" sx={{ height: "100%" }}>
            <img
                style={{ width: "20%", objectFit: "contain" }}
                src={flagUrl}
                alt="Realm's flag sample"
                loading="lazy"
                onError={(e) => {
                    e.target.src = staticApiRoutes.defaultRealmImage;
                }}
            />
            <Stack sx={{ width: "80%" }}>
                <Stack>
                    <Typography variant="h4">
                        {selectedRealm ? selectedRealm.name : gamePreparingScreen.playerBox.realmNotSelected}
                    </Typography>
                    {modificator && (
                        <Typography variant="subtitle2" color="success.main">
                            {modificator.name}
                        </Typography>
                    )}
                    {modificator && (
                        <Typography
                            className="realm-modificator-description"
                            variant="caption"
                            color="text.secondary"
                        >
                            {modificator.description}
                        </Typography>
                    )}
                </Stack>
                <Stack direction="row" sx={{ mt: "auto" }}>
                    <Stack spacing={2} direction="row" sx={{ alignItems: "flex-end" }}>
                        <PlayerActions player={player} selectedRealm={selectedRealm} />
                        {player.isReady && gameStore.info.playerOwnerId !== player.id && (
                            <Chip label={gamePreparingScreen.playerBox.playerIsReadyLabel} color="success" />
                        )}
                    </Stack>
                    <PlayerAvatar player={player} sx={{ ml: "auto" }} />
                </Stack>
            </Stack>
        </Stack>
    );
});

export const Player = observer(({ player = null, ...props }) => {
    return (
        <Paper elevation={1} {...props} sx={{ p: 2, ...props.sx }}>
            {player === null ? <UnconnectedPlayer /> : <ConnectedPlayer player={player} />}
        </Paper>
    );
});
