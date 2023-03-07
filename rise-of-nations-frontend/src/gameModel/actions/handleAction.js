import { gameConstants } from "../../common/constants";
import { stores } from "../../store";
import { Unit } from "../models";

const unitTypeToCostGameVar = {
    [gameConstants.unitTypes.lvl1]: gameConstants.gameVariableTypes.unitCostLevelOne,
    [gameConstants.unitTypes.lvl2]: gameConstants.gameVariableTypes.unitCostLevelTwo,
    [gameConstants.unitTypes.lvl3]: gameConstants.gameVariableTypes.unitCostLevelThree,
};
const createUnitAction = ({ tileRow, tileCol, unitType }) => {
    const model = stores.currentGame.model;
    const tile = model.tilesMatrix[tileRow][tileCol];
    const country = model.countries[tile.countryIndex];
    const currentTreasure = country.treasure;
    const unitCost = country.gameVariables[unitTypeToCostGameVar[unitType]];
    country.setTreasure(currentTreasure - unitCost);
    tile.setUnit(new Unit(unitType));
};
const buildingTypeToCostGameVar = {
    [gameConstants.buildingTypes.farm]: gameConstants.gameVariableTypes.farmCostInitial,
    [gameConstants.buildingTypes.tower1]: gameConstants.gameVariableTypes.unitCostLevelTwo,
    [gameConstants.buildingTypes.tower2]: gameConstants.gameVariableTypes.unitCostLevelThree,
};
const createBuildingAction = ({ tileRow, tileCol, buildingType }) => {
    const model = stores.currentGame.model;
    const tile = model.tilesMatrix[tileRow][tileCol];
    const country = model.countries[tile.countryIndex];
    const currentTreasure = country.treasure;
    let buildingCost = country.gameVariables[buildingTypeToCostGameVar[buildingType]];
    if (buildingType === gameConstants.buildingTypes.farm) {
        buildingCost = country.currentFarmCost;
    }
    country.setTreasure(currentTreasure - buildingCost);
    tile.setBuilding(buildingType);
};
const moveUnitAction = ({ tileRow, tileCol, tileRowMove, tileColMove }) => {
    const model = stores.currentGame.model;
    const unitTile = model.tilesMatrix[tileRow][tileCol];
    const unitTileMove = model.tilesMatrix[tileRowMove][tileColMove];
    const unit = unitTile.unit;
    const country = model.countries[unitTile.countryIndex];

    unit.setIsMakingMove(true);
    unitTile.setUnit(null);
    unitTileMove.setUnit(unit);
    if (unitTileMove.countryIndex !== null && unitTileMove.countryIndex !== unitTile.countryIndex) {
        const affectedCountry = model.countries[unitTileMove.countryIndex];
        affectedCountry.removeTile(unitTileMove);
        unitTileMove.setBuilding(null);
        if (affectedCountry.land.length === 0) {
            affectedCountry.setIsIgnorable(true);
        }
    }
    unitTileMove.setCountryIndex(unitTile.countryIndex);
    country.addTile(unitTileMove);
};

export const handleAction = (actionType, values) => {
    if (actionType === gameConstants.actions.createUnit) {
        createUnitAction(values);
    }
    if (actionType === gameConstants.actions.createBuilding) {
        createBuildingAction(values);
    }
    if (actionType === gameConstants.actions.moveUnit) {
        moveUnitAction(values);
    }

    stores.canvas.unsetAction();
};
