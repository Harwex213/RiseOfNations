import React from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { chatComponent } from "../../../common/localization";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export const GameChat = ({ ...props }) => {
    return (
        <Paper elevation={1} {...props} sx={{ height: "100%", p: 2, ...props.sx }}>
            <Stack spacing={1} sx={{ height: "100%" }}>
                <Typography variant="h5">{chatComponent.title}</Typography>
                <Divider />
                <MessageList />
                <MessageInput />
            </Stack>
        </Paper>
    );
};
