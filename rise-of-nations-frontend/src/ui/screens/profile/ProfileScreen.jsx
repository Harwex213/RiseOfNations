import * as React from "react";
import { Box, Paper, Card, CardMedia, CardContent, Typography, Stack, Divider, Button } from "@mui/material";
import { stores } from "../../../store";
import { observer } from "mobx-react-lite";
import { profile } from "../../../common/localization";
import userAvatarSample from "./user-avatar-sample.png";
import { FeaturedRealms } from "../../containers";
import { authenticationService } from "../../../services";

const userStore = stores.user;

export const ProfileScreen = observer(() => {
    return (
        <Box
            sx={{ width: "100%", height: "100%" }}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={1}
        >
            <Box gridColumn="span 9" sx={{ minHeight: "100%" }}>
                <Paper sx={{ width: "100%", height: "100%", maxHeight: "100%", padding: 2 }}>
                    <Stack sx={{ height: "40%" }} spacing={2}>
                        <Typography variant="h4">{profile.pageTitle}</Typography>
                        <Divider />
                        <Typography variant="body1">TODO: describe player</Typography>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography variant="h4">{profile.profileDescribe.featuredRealms}</Typography>
                        <Divider />
                        <FeaturedRealms />
                    </Stack>
                </Paper>
            </Box>
            <Box gridColumn="span 3">
                <Card>
                    <CardMedia component="img" image={userAvatarSample} alt="Player avatar" height={310} />
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h3" sx={{ textAlign: "center" }}>
                                {userStore.user.username}
                            </Typography>
                            <Button variant="outlined">{profile.actions.editProfile}</Button>
                            <Button variant="outlined" color="error" onClick={authenticationService.logout}>
                                {profile.actions.logout}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
});
