import { makeAutoObservable } from "mobx";
import { canvasConstants } from "../../common/constants";

export default class CanvasStore {
    currentAction = null;
    possibleTiles = [];
    creationUnitType = "";
    creationBuildingType = "";
    movingUnitTile = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isActionSet() {
        return this.currentAction !== null;
    }

    unsetAction() {
        this.currentAction = null;
        this.possibleTiles = [];
    }

    setTryingCreateUnit(possibleTiles, creationUnitType) {
        this.currentAction = canvasConstants.actions.tryingCreateUnit;
        this.possibleTiles = possibleTiles;
        this.creationUnitType = creationUnitType;
    }

    setTryingCreateBuilding(possibleTiles, creationBuildingType) {
        this.currentAction = canvasConstants.actions.tryingCreateBuilding;
        this.possibleTiles = possibleTiles;
        this.creationBuildingType = creationBuildingType;
    }

    setTryingMoveUnit(possibleTiles, movingUnitTile) {
        this.currentAction = canvasConstants.actions.tryingMoveUnit;
        this.possibleTiles = possibleTiles;
        this.movingUnitTile = movingUnitTile;
    }
}
