import React from "react";
import { observer } from "mobx-react-lite";
import { Paper, Typography } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";

export const PlayerAvatar = observer(({ player, ...props }) => {
    return (
        <Paper
            elevation={3}
            {...props}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", ...props.sx }}
        >
            <Typography variant="body2" sx={{ p: "4px 8px" }}>
                {player.username}
            </Typography>
            {player.isOwner && <GradeIcon color="warning" fontSize="1" sx={{ mr: "8px" }} />}
        </Paper>
    );
});
