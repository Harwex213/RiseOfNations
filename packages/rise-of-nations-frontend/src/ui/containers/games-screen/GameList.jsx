import React, { useLayoutEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { CenteredBox, Game } from "../../components";
import { CreateGame } from "./CreateGame";
import { stores } from "../../../store";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../common/constants";
import { observer } from "mobx-react-lite";
import { gamesScreen } from "../../../common/localization";
import { suspenseServiceError } from "../../../common/utils";
import { gameService, gamesService } from "../../../services";
import { useSnackbar } from "notistack";

const userStore = stores.user;
const gamesStore = stores.games;

const notTryingToJoinGameId = -1;

export const GameList = observer(() => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [tryingToJoinGameId, setTryingToJoinGameId] = useState(notTryingToJoinGameId);
    useLayoutEffect(() => {
        suspenseServiceError(
            async () => {
                await gamesService.subscribeToGameList();
            },
            { notify: enqueueSnackbar }
        )();
    }, [enqueueSnackbar]);

    const handleOnJoinToGame = suspenseServiceError(
        async (game) => {
            if (userStore.user.isAuthenticated === false) {
                navigate(routes.login);
                return;
            }

            setTryingToJoinGameId(game.id);
            await gameService.joinGame(game);
            setTryingToJoinGameId(notTryingToJoinGameId);
            navigate(routes.gamesNested.preparing);
        },
        { notify: enqueueSnackbar, onError: () => setTryingToJoinGameId(notTryingToJoinGameId) }
    );

    const games = gamesStore.isFetching ? (
        <CenteredBox>
            <CircularProgress />
        </CenteredBox>
    ) : (
        gamesStore.games.map((game) => (
            <Game
                key={game.id}
                game={game}
                isTryingToJoin={tryingToJoinGameId === game.id}
                onJoin={handleOnJoinToGame}
            />
        ))
    );

    return (
        <Stack sx={{ height: "100%" }}>
            <Typography variant="h4">{gamesScreen.gameList.pageTitle}</Typography>
            <Stack direction="row" spacing={2} sx={{ width: "100%", height: "calc(100% - 58px)", mt: 2 }}>
                <Stack spacing={2} sx={{ width: "50%", overflowY: "auto" }}>
                    {games}
                </Stack>
                <Stack sx={{ width: "50%", alignItems: "center" }}>
                    <Typography variant="subtitle1">{gamesScreen.gameList.pageSubtitle}</Typography>
                    <CreateGame sx={{ width: "75%", height: "100%", m: "auto" }} />
                </Stack>
            </Stack>
        </Stack>
    );
});
