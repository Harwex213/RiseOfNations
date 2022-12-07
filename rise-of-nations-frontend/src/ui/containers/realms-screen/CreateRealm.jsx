import React from "react";
import { RealmForm } from "../../components";
import { Stack, Typography } from "@mui/material";
import { realms } from "../../../common/localization";

export const CreateRealm = () => {
    return (
        <Stack>
            <Typography variant="h4">{realms.pageTitles.create}</Typography>
            <RealmForm
                initialValues={{
                    name: "",
                    description: "",
                    modificatorId: "",
                }}
                onSubmit={() => {}}
                mt={2}
            />
        </Stack>
    );
};
