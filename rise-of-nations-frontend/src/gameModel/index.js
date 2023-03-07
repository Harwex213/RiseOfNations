import { handleAction } from "./actions/handleAction";
import { initModel } from "./actions/initModel";
import { onTryingCreateUnit } from "./actions/onTryingCreateUnit";
import { onTryingCreateBuilding } from "./actions/onTryingCreateBuilding";
import { onTryingMoveUnit } from "./actions/onTryingMoveUnit";
import { cleanCountry } from "./actions/cleanCountry";

export const gameModel = {
    handleAction,
    initModel,
    onTryingCreateUnit,
    onTryingCreateBuilding,
    onTryingMoveUnit,
    cleanCountry,
};
