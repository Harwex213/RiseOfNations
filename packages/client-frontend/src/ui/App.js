import React, { useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../common/constants";
import {
    GamesScreen,
    ProfileScreen,
    LoginScreen,
    RegistrationScreen,
    RealmsScreen,
    GameScreen,
} from "./screens";
import { AuthenticatedAccess, InGameAccess, Layout, OnlyGuestAccess } from "./containers";
import { authenticationService, gameInfoService } from "../services";
import { observer } from "mobx-react-lite";
import { stores } from "../store";
import { CenteredBox } from "./components";
import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

const userStore = stores.user;
const uiStore = stores.ui;

const App = observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    useLayoutEffect(() => {
        gameInfoService.getGameInfo().catch(() => {});
        authenticationService.describe().catch(() => userStore.setIsFetchingDescribe(false));
        uiStore.setNotifyFunc(enqueueSnackbar);
    }, [enqueueSnackbar]);

    if (userStore.isFetchingDescribe) {
        return (
            <Box sx={{ height: "100vh" }}>
                <CenteredBox>
                    <CircularProgress />
                </CenteredBox>
            </Box>
        );
    }

    return (
        <Routes>
            <Route
                path={routes.game}
                element={
                    <AuthenticatedAccess>
                        <InGameAccess>
                            <GameScreen />
                        </InGameAccess>
                    </AuthenticatedAccess>
                }
            />
            <Route
                path={`${routes.games}/*`}
                element={
                    <Layout>
                        <GamesScreen />
                    </Layout>
                }
            />
            <Route
                path={routes.profile}
                element={
                    <AuthenticatedAccess>
                        <Layout>
                            <ProfileScreen />
                        </Layout>
                    </AuthenticatedAccess>
                }
            />
            <Route
                path={`${routes.realms}/*`}
                element={
                    <AuthenticatedAccess>
                        <Layout>
                            <RealmsScreen />
                        </Layout>
                    </AuthenticatedAccess>
                }
            />
            <Route
                path={routes.login}
                element={
                    <OnlyGuestAccess>
                        <Layout>
                            <LoginScreen />
                        </Layout>
                    </OnlyGuestAccess>
                }
            />
            <Route
                path={routes.registration}
                element={
                    <OnlyGuestAccess>
                        <Layout>
                            <RegistrationScreen />
                        </Layout>
                    </OnlyGuestAccess>
                }
            />
            <Route path={routes.index} element={<Navigate to={routes.defaultRoute} replace={true} />} />
            <Route path="*" element={<Navigate to={routes.defaultRoute} replace={true} />} />
        </Routes>
    );
});

export default App;
