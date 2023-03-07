import { stores } from "../../store";
import { gameConstants } from "../../common/constants";
import { directionVectors } from "../models";

const { up, down, left, right, leftUp, rightUp, leftDown, rightDown } = directionVectors;
const { unitTypes, buildingTypes } = gameConstants;

let moveMatrixMarks = null;
let friendlyCountryIndex = -1;
let possibleMoves = [];

const getPossibleUnitMovesWithMovement = (unitType, point, movement, friendlyMovePoints, foreignMovePoints) =>
    getPossibleUnitMoves(
        unitType,
        [point[0] + movement[0], point[1] + movement[1]],
        friendlyMovePoints,
        foreignMovePoints
    );
const addPossibleMove = (point, tile) => {
    if (moveMatrixMarks[point[0]][point[1]] === false) {
        moveMatrixMarks[point[0]][point[1]] = true;
        possibleMoves.push(tile);
    }
};
const isNeighbourPointHaveBuildings = (point, movement, buildings) => {
    const tile = stores.currentGame.model.tilesMatrix[point[0] + movement[0]][point[1] + movement[1]];
    return tile !== null && buildings.includes(tile.building);
};
const isTileInRangeOfBuildings = (tile, buildings) => {
    const point = [tile.row, tile.col];
    if (isNeighbourPointHaveBuildings(point, up, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, down, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, left, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, right, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, left, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, leftUp, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, rightUp, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, leftDown, buildings)) return true;
    if (isNeighbourPointHaveBuildings(point, rightDown, buildings)) return true;

    return false;
};
const unitLvlOneUnTouchableBuildings = [buildingTypes.tower1, buildingTypes.tower2];
const unitLvlTwoUnTouchableBuildings = [buildingTypes.tower2];
const isUnitMetUnDestroyable = (unitType, movementTile) => {
    if (unitType === unitTypes.lvl3) {
        return false;
    }
    if (unitType === unitTypes.lvl1) {
        return (
            isTileInRangeOfBuildings(movementTile, unitLvlOneUnTouchableBuildings) || movementTile.isHaveUnit
        );
    }

    return (
        isTileInRangeOfBuildings(movementTile, unitLvlTwoUnTouchableBuildings) ||
        (movementTile.isHaveUnit &&
            (movementTile.unit.type === unitTypes.lvl2 || movementTile.unit.type === unitTypes.lvl3))
    );
};
const getPossibleUnitMoves = (unitType, point, friendlyMovePoints, foreignMovePoints, initial = false) => {
    const tile = stores.currentGame.model.tilesMatrix[point[0]][point[1]];

    if (tile === null) {
        return;
    }

    if (tile.countryIndex === friendlyCountryIndex && initial === false) {
        if (friendlyMovePoints === 0) {
            return;
        }
        if (friendlyMovePoints === 1) {
            if ((tile.isHaveUnit || tile.isHaveBuilding) === false) {
                addPossibleMove(point, tile);
            }
            return;
        }

        friendlyMovePoints--;
        if ((tile.isHaveUnit || tile.isHaveBuilding) === false) {
            addPossibleMove(point, tile);
        }
    }
    if (tile.countryIndex !== friendlyCountryIndex && initial === false) {
        if (foreignMovePoints === 0 || isUnitMetUnDestroyable(unitType, tile)) {
            return;
        }
        if (foreignMovePoints === 1) {
            addPossibleMove(point, tile);
            return;
        }

        foreignMovePoints--;
        addPossibleMove(point, tile);
    }

    getPossibleUnitMovesWithMovement(unitType, point, up, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, down, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, left, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, right, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, leftUp, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, rightUp, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, leftDown, friendlyMovePoints, foreignMovePoints);
    getPossibleUnitMovesWithMovement(unitType, point, rightDown, friendlyMovePoints, foreignMovePoints);
};

export const onTryingMoveUnit = (unitTile) => {
    const model = stores.currentGame.model;

    moveMatrixMarks = model.tilesMatrix.map((row) => row.map(() => false));
    possibleMoves = [];
    friendlyCountryIndex = unitTile.countryIndex;

    const country = model.countries[unitTile.countryIndex];
    const friendlyMovePoints = country.gameVariables[gameConstants.gameVariableTypes.unitMoveOnFriendTiles];
    const foreignMovePoints = country.gameVariables[gameConstants.gameVariableTypes.unitMoveOnEnemyTiles];
    getPossibleUnitMoves(
        unitTile.unit.type,
        [unitTile.row, unitTile.col],
        friendlyMovePoints,
        foreignMovePoints,
        true
    );

    return possibleMoves;
};
