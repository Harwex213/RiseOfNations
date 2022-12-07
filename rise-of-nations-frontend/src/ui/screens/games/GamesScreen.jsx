import * as React from "react";
import Button from "@mui/material/Button";
import { games } from "../../../common/localization";
import { Box, Paper, Stack } from "@mui/material";

const Game = () => (
    <Paper elevation={3} sx={{ height: "100px" }}>
        This is the game!
    </Paper>
);

export const GamesScreen = () => {
    return (
        <Box
            sx={{ width: "50%", height: "100%" }}
            display="grid"
            gridTemplateRows="40px repeat(11, 1fr)"
            gap={1}
        >
            <Box gridRow="1" display="flex" sx={{ justifyContent: "center" }}>
                <Button variant="outlined">{games.createGame}</Button>
            </Box>
            <Box gridRow="span 11">
                <Paper sx={{ width: "100%", maxHeight: "100%", padding: 2, overflowX: "auto" }}>
                    <Stack spacing={2}>
                        {Array.from(Array(10), () => 0).map((_, index) => (
                            <Game key={index} />
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};
