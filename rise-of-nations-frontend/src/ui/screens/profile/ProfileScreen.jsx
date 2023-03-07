import * as React from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import { stores } from "../../../store";
import { observer } from "mobx-react-lite";
import { profile } from "../../../common/localization";
import { authenticationService } from "../../../services";

const userStore = stores.user;

export const ProfileScreen = observer(() => {
    const isEmailSpecified = userStore.user.email !== null;

    return (
        <Stack spacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
            <Typography variant="h4">{profile.pageTitle}</Typography>
            <Box
                sx={{ width: "100%", height: "100%" }}
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
            >
                <Box gridColumn="span 12" sx={{ minHeight: "100%" }}>
                    <Paper sx={{ width: "100%", padding: 2 }}>
                        <Stack sx={{ height: "40%" }} spacing={2}>
                            <Typography variant="body1">Username: {userStore.user.username}</Typography>
                            <Typography variant="body1">
                                Email: {isEmailSpecified ? userStore.user.email : "Not specified"}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={authenticationService.logout}
                                sx={{ width: 250 }}
                            >
                                {profile.actions.logout}
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
                {/*<Box gridColumn="span 3">*/}
                {/*    <Card>*/}
                {/*        /!*<CardMedia component="img" image={userAvatarSample} alt="Player avatar" height={310} />*!/*/}
                {/*        <CardContent>*/}
                {/*            <Stack spacing={2}>*/}
                {/*                <Typography variant="h3" sx={{ textAlign: "center" }}>*/}
                {/*                    {userStore.user.username}*/}
                {/*                </Typography>*/}
                {/*                /!*<Button variant="outlined">{profile.actions.editProfile}</Button>*!/*/}
                {/*            </Stack>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</Box>*/}
            </Box>
        </Stack>
    );
});
