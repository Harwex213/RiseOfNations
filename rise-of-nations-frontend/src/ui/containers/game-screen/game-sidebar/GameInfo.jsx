import React from "react";
import { observer } from "mobx-react-lite";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { gameScreen } from "../../../../common/localization";
import { LoadingButton } from "@mui/lab";

export const GameInfo = observer(({ ...props }) => {
    return (
        <Paper elevation={1} {...props} sx={{ p: 2, ...props.sx }}>
            <Stack spacing={1}>
                <Stack direction="row">
                    <Typography variant="h4">{gameScreen.gameInfo.turn} 12</Typography>
                    <LoadingButton variant="contained" color="success" sx={{ ml: "auto" }}>
                        {gameScreen.gameInfo.endTurnAction}
                    </LoadingButton>
                </Stack>
                <Divider />
                <Stack>
                    <Typography variant="h4">{gameScreen.gameInfo.treasure} 122 + 91</Typography>
                    <Typography variant="subtitle1">{gameScreen.gameInfo.income} 120</Typography>
                    <Typography variant="subtitle1">{gameScreen.gameInfo.expense} 32</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
});
