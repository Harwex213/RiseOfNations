import React from "react";
import { RealmForm } from "../../components";
import { Stack, Typography } from "@mui/material";
import { realms } from "../../../common/localization";
import { realmsService } from "../../../services";

export const CreateRealm = () => {
    return (
        <Stack>
            <Typography variant="h4">{realms.pageTitles.create}</Typography>
            <RealmForm
                initialValues={{
                    name: "",
                    description: "",
                    modificatorId: "",
                    flag: undefined,
                }}
                onSubmit={realmsService.createRealm}
                mt={2}
            />
        </Stack>
    );
};
