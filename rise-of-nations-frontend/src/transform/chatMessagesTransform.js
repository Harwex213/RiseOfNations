const mapSingleFromApi = (message) => ({
    author: {
        id: message.authorId,
        username: message.authorUsername,
        playerIndex: message.authorPlayerIndex,
    },
    content: message.message,
    time: message.time,
});

export const chatMessagesTransform = {
    mapSingleFromApi,
    mapMultipleFromApi: (messages) => messages.map(mapSingleFromApi),
};
