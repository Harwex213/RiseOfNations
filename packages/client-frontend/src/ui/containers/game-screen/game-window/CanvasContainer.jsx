import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { CanvasStage } from "./canvas/CanvasStage";
import { CenteredBox, PlayerAvatar } from "../../../components";
import { observer } from "mobx-react-lite";
import { stores } from "../../../../store";
import { staticApiRoutes } from "../../../../common/constants";
import { gamePreparingScreen } from "../../../../common/localization";

const currentGame = stores.currentGame;
const userStore = stores.user;

const GameLoose = () => {
    return (
        <CenteredBox>
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h1">Game over!</Typography>
                <Typography variant="h4">Your country have been destroyed.</Typography>
            </Stack>
        </CenteredBox>
    );
};

const GameFinished = () => {
    const getPlayerRealm = (player) => {
        if (userStore.user.id === player.id) {
            return userStore.getRealm(player.selectedRealmId);
        }

        return currentGame.getPlayerRealm(player.id);
    };
    const winnerPlayer = currentGame.info.players[currentGame.info.playerWinnerIndex];
    const selectedRealm = getPlayerRealm(winnerPlayer);
    const flagUrl =
        selectedRealm !== null && selectedRealm.flagExtension !== null
            ? `${staticApiRoutes.realmImages}/${selectedRealm.flagId + selectedRealm.flagExtension}`
            : staticApiRoutes.defaultRealmImage;
    return (
        <CenteredBox>
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h1">Game is finished!</Typography>
                <img
                    style={{ width: "20%", objectFit: "contain" }}
                    src={flagUrl}
                    alt="Realm's flag sample"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = staticApiRoutes.defaultRealmImage;
                    }}
                />
                <Stack direction="row" spacing={1}>
                    <Typography variant="h4">Realm</Typography>
                    <Typography variant="h4" color="warning.light">
                        {selectedRealm.name}
                    </Typography>
                    <Typography variant="h4"> win!</Typography>
                </Stack>
            </Stack>
        </CenteredBox>
    );
};

export const CanvasContainer = observer(() => {
    // const canvasContainerRef = useRef();
    // const [containerRes, setContainerRes] = useState({ width: 0, height: 0 });
    //
    // const container = canvasContainerRef.current;

    if (currentGame.isUserDefeated) {
        return <GameLoose />;
    }

    if (currentGame.isGameFinished) {
        return <GameFinished />;
    }

    // useEffect(() => {
    //     if (!container) {
    //         return;
    //     }
    //     const updateImageRes = () => {
    //         const containerRect = container.getBoundingClientRect();
    //         const containerRes = { width: containerRect.width, height: containerRect.height };
    //
    //         setContainerRes(containerRes);
    //     };
    //
    //     window.addEventListener("resize", updateImageRes);
    //     updateImageRes();
    //     return () => {
    //         window.removeEventListener("resize", updateImageRes);
    //     };
    // }, [container]);

    return (
        <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            {currentGame.isModelSet ? (
                <CanvasStage model={stores.currentGame.model} />
            ) : (
                <CenteredBox>
                    <CircularProgress />
                </CenteredBox>
            )}
        </Box>
    );
});
