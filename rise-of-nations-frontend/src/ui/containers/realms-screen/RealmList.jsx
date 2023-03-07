import React, { useLayoutEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Stack, Typography } from "@mui/material";
import { realms } from "../../../common/localization";
import { Realm } from "../../components";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../common/constants";
import { realmsService } from "../../../services";
import { suspenseServiceError } from "../../../common/utils";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react-lite";
import { stores } from "../../../store";

const userStore = stores.user;

export const RealmList = observer(() => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useLayoutEffect(() => {
        suspenseServiceError(
            async () => {
                await realmsService.getRealms();
            },
            { notify: enqueueSnackbar }
        )();
    }, [enqueueSnackbar]);

    const handleRealmDelete = suspenseServiceError(
        async (realm) => {
            await realmsService.deleteRealm({ id: realm.id });
            await realmsService.getRealms();
        },
        { notify: enqueueSnackbar }
    );

    return (
        <Stack>
            <Typography variant="h4">{realms.pageTitles.list}</Typography>
            <Grid2 container spacing={2} mt={2}>
                <Grid2 item xs={6}>
                    <Button
                        variant="outlined"
                        sx={{ minHeight: 300, width: "100%", height: "100%" }}
                        onClick={() => navigate(routes.realmsNested.createRealm)}
                    >
                        {realms.realmListActions.createRealm}
                    </Button>
                </Grid2>
                {userStore.userRealms.map((realm) => (
                    <Grid2 item key={realm.id} xs={6}>
                        <Realm
                            realm={realm}
                            elevation={1}
                            sx={{ height: 300 }}
                            onDelete={handleRealmDelete}
                            onUpdate={(id) => navigate(String(id))}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
});
