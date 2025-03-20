import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { realms } from "../../../../common/localization";
import Grid2 from "@mui/material/Unstable_Grid2";
import { staticApiRoutes } from "../../../../common/constants";
import { stores } from "../../../../store";
import "./Realm.css";

export const Realm = ({ realm, onUpdate, onDelete, ...props }) => {
    const modificator = stores.globalGameInfo.getModificator(realm.modificatorId);
    const flagUrl =
        realm.flagExtension === null
            ? staticApiRoutes.defaultRealmImage
            : `${staticApiRoutes.realmImages}/${realm.flagId + realm.flagExtension}`;

    return (
        <Paper {...props} sx={{ padding: 2, ...props.sx }}>
            <Stack direction="row" sx={{ height: "100%" }}>
                <img
                    style={{ width: "30%", objectFit: "contain" }}
                    src={flagUrl}
                    alt="Realm's flag sample"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = staticApiRoutes.defaultRealmImage;
                    }}
                />
                <Grid2 container spacing={0} sx={{ width: "70%" }}>
                    <Grid2 item xs={12}>
                        <Typography variant="h4">{realm.name}</Typography>
                        <Typography className="realm-description" variant="body1">
                            {realm.description}
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={12}>
                        <Typography variant="h6" color="success.main">
                            {modificator.name}
                        </Typography>
                        <Typography
                            className="realm-modificator-description"
                            variant="caption"
                            color="text.secondary"
                        >
                            {modificator.description}
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={12} sx={{ marginTop: "auto" }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={() => onUpdate(realm.id)}>
                                {realms.realmListActions.updateRealm}
                            </Button>
                            <Button variant="contained" color="error" onClick={() => onDelete(realm)}>
                                {realms.realmListActions.deleteRealm}
                            </Button>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Stack>
        </Paper>
    );
};
