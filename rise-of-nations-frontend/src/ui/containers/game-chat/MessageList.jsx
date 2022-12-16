import React, { useLayoutEffect, useRef } from "react";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { stores } from "../../../store";

const gameStore = stores.currentGame;

const Message = ({ message }) => {
    const { content, time, author } = message;

    return (
        <Stack>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography variant="body1">{author.username}</Typography>
                <Typography variant="body2" color="text.secondary" ml="auto">
                    {moment(time).format("h:mm:ss a")}
                </Typography>
            </Stack>
            <Typography variant="body2">{content}</Typography>
        </Stack>
    );
};

export const MessageList = observer(() => {
    const messagesEndRef = useRef(null);

    useLayoutEffect(() => {
        messagesEndRef.current?.scrollTo(0, messagesEndRef.current?.scrollHeight);
    });

    return (
        <Stack ref={messagesEndRef} spacing={1} sx={{ height: "100%", overflowY: "auto" }}>
            {gameStore.chatMessages.map((chatMessage, index) => (
                <Message key={index} message={chatMessage} />
            ))}
        </Stack>
    );
});
