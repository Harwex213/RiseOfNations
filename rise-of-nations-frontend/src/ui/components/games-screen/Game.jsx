import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import GradeIcon from "@mui/icons-material/Grade";
import { games } from "../../../common/localization";

const GamePlayer = ({ isCreator }) => {
    return (
        <Grid2>
            <Paper elevation={3} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography variant="body2" sx={{ p: "4px 8px" }}>
                    Olezha!
                </Typography>
                {isCreator && <GradeIcon color="warning" fontSize="1" sx={{ mr: "8px" }} />}
            </Paper>
        </Grid2>
    );
};

export const Game = ({ game, ...props }) => {
    return (
        <Paper elevation={1} {...props} sx={{ p: 2, ...props.sx }}>
            <Stack spacing={1} sx={{ width: "100%", height: "100%" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <Typography variant="h6">This is my best game ever!</Typography>
                    <Typography variant="h5" color="text.secondary" ml={2}>
                        1 / 2
                    </Typography>
                    <Button variant="contained" color="success" sx={{ width: 150, m: "auto 0", ml: "auto" }}>
                        {games.gameList.actions.joinGame}
                    </Button>
                </Stack>
                <Grid2 container gap={2}>
                    {[...new Array(2)].map((_, index) => (
                        <GamePlayer key={index} isCreator={index === 0} />
                    ))}
                </Grid2>
            </Stack>
        </Paper>
    );
};
