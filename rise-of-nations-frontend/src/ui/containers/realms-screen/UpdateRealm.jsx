import React, { useLayoutEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { realms } from "../../../common/localization";
import { RealmForm } from "../../components";
import { realmsService } from "../../../services";
import { useParams } from "react-router-dom";

export const UpdateRealm = () => {
    const { updateRealmId } = useParams();
    const [realm, setRealm] = useState(null);
    useLayoutEffect(() => {
        const action = async () => {
            const { payload: fetchedRealm } = await realmsService.getRealm({ id: Number(updateRealmId) });
            setRealm(fetchedRealm);
        };
        action();
    }, [updateRealmId]);

    return (
        <Stack>
            <Typography variant="h4">{realms.pageTitles.update}</Typography>
            {realm && (
                <RealmForm
                    isUpdate
                    initialValues={{
                        id: realm.id,
                        name: realm.name,
                        description: realm.description,
                        modificatorId: realm.modificatorId,
                        flag: undefined,
                    }}
                    onSubmit={realmsService.updateRealm}
                    mt={2}
                />
            )}
        </Stack>
    );
};
