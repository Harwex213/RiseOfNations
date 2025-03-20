import React from "react";
import { observer } from "mobx-react-lite";
import { Divider, IconButton, Stack, Tooltip } from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { stores } from "../../../../store";
import { gameConstants } from "../../../../common/constants";
import { gameService } from "../../../../services";

const currentGame = stores.currentGame;
const { buildingTypes, unitTypes } = gameConstants;

export const GameWindowActions = observer(() => {
    const model = currentGame.model;
    const userCountry = model.countries[currentGame.userCountryIndex];
    const { buildings, units } = userCountry.possiblePurchases;
    const isNotUserTurn = model.currentTurnPlayerIndex !== currentGame.userCountryIndex;

    return (
        <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Create farm">
                    <IconButton
                        disabled={
                            !buildings[buildingTypes.farm] || isNotUserTurn || currentGame.isGameFinished
                        }
                        onClick={() => gameService.onTryingCreateBuilding(buildingTypes.farm)}
                    >
                        <AddHomeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create tower lvl 2">
                    <IconButton
                        disabled={
                            !buildings[buildingTypes.tower1] || isNotUserTurn || currentGame.isGameFinished
                        }
                        onClick={() => gameService.onTryingCreateBuilding(buildingTypes.tower1)}
                    >
                        <AddModeratorIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create tower lvl 1">
                    <IconButton
                        disabled={
                            !buildings[buildingTypes.tower2] || isNotUserTurn || currentGame.isGameFinished
                        }
                        onClick={() => gameService.onTryingCreateBuilding(buildingTypes.tower2)}
                    >
                        <AddModeratorIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack>
                <Divider orientation="vertical" />
            </Stack>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Create unit lvl 1">
                    <IconButton
                        disabled={!units[unitTypes.lvl1] || isNotUserTurn}
                        onClick={() => gameService.onTryingCreateUnit(unitTypes.lvl1)}
                    >
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create unit lvl 2">
                    <IconButton
                        disabled={!units[unitTypes.lvl2] || isNotUserTurn}
                        onClick={() => gameService.onTryingCreateUnit(unitTypes.lvl2)}
                    >
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create unit lvl 3">
                    <IconButton
                        disabled={!units[unitTypes.lvl3] || isNotUserTurn}
                        onClick={() => gameService.onTryingCreateUnit(unitTypes.lvl3)}
                    >
                        <GroupAddIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
});
