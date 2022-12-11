import React, { useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../common/constants";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GamesScreen, ProfileScreen, LoginScreen, RegistrationScreen, RealmsScreen } from "./screens";
import { AuthenticatedAccess, Layout, OnlyGuestAccess, FetchProgress } from "./containers";
import { authenticationService, gameInfoService } from "../services";
import { useSnackbar } from "notistack";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const { enqueueSnackbar } = useSnackbar();
    useLayoutEffect(() => {
        authenticationService.describe().catch(() => {});
        gameInfoService.getGameInfo().catch(() => {});
    }, [enqueueSnackbar]);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <FetchProgress />
            <Layout>
                <Routes>
                    <Route path={`${routes.games}/*`} element={<GamesScreen />} />
                    <Route
                        path={routes.profile}
                        element={
                            <AuthenticatedAccess>
                                <ProfileScreen />
                            </AuthenticatedAccess>
                        }
                    />
                    <Route
                        path={`${routes.realms}/*`}
                        element={
                            <AuthenticatedAccess>
                                <RealmsScreen />
                            </AuthenticatedAccess>
                        }
                    />
                    <Route
                        path={routes.login}
                        element={
                            <OnlyGuestAccess>
                                <LoginScreen />
                            </OnlyGuestAccess>
                        }
                    />
                    <Route
                        path={routes.registration}
                        element={
                            <OnlyGuestAccess>
                                <RegistrationScreen />
                            </OnlyGuestAccess>
                        }
                    />
                    <Route
                        path={routes.index}
                        element={<Navigate to={routes.defaultRoute} replace={true} />}
                    />
                    <Route path="*" element={<Navigate to={routes.defaultRoute} replace={true} />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
