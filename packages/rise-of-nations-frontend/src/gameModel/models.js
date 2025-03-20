import { makeAutoObservable } from "mobx";
import { gameConstants } from "../common/constants";
import { stores } from "../store";
import { gameService } from "../services";

const currentGame = stores.currentGame;
const { buildingTypes, unitTypes, gameVariableTypes } = gameConstants;

export class Tile {
    row = 0;
    col = 0;
    countryIndex = null;
    building = null;
    unit = null;

    constructor(row, col) {
        this.row = row;
        this.col = col;
        makeAutoObservable(this, {});
    }

    setCountryIndex(countryIndex) {
        this.countryIndex = countryIndex;
    }

    setBuilding(building) {
        this.building = building;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    get isBelongsToCountry() {
        return this.countryIndex !== null;
    }

    get isHaveBuilding() {
        return this.building !== null;
    }

    get isHaveUnit() {
        return this.unit !== null;
    }
}

export class Country {
    land = [];
    color = "";
    treasure = 0;
    gameVariables = {};
    isIgnorable = false;

    constructor() {
        makeAutoObservable(this, {});
    }

    clearLand() {
        this.land = [];
    }

    setIsIgnorable(value) {
        this.isIgnorable = value;
    }

    removeTile(tileToRemove) {
        const index = this.land.findIndex(
            (tile) => tile.row === tileToRemove.row && tile.col === tileToRemove.col
        );
        if (index !== -1) {
            this.land.splice(index, 1);
        }
    }

    addTile(tile) {
        this.land.push(tile);
    }

    setColor(color) {
        this.color = color;
    }

    setGameVariables(gameVariables) {
        this.gameVariables = gameVariables;
    }

    setTreasure(newTreasure) {
        this.treasure = newTreasure;
    }

    get currentFarmAmount() {
        const farmTiles = this.land.filter(
            (tile) => tile.building !== null && tile.building === buildingTypes.farm
        );
        return farmTiles.length;
    }

    get currentFarmCost() {
        const farmInitialCost = this.gameVariables[gameVariableTypes.farmCostInitial];
        const farmIncreasingCost = this.gameVariables[gameVariableTypes.farmCostIncreasing];
        return farmInitialCost + farmIncreasingCost * this.currentFarmAmount;
    }

    get possiblePurchases() {
        return {
            buildings: {
                [buildingTypes.farm]: this.treasure - this.currentFarmCost >= 0,
                [buildingTypes.tower1]:
                    this.treasure - this.gameVariables[gameVariableTypes.towerCostLevelOne] >= 0,
                [buildingTypes.tower2]:
                    this.treasure - this.gameVariables[gameVariableTypes.towerCostLevelTwo] >= 0,
            },
            units: {
                [unitTypes.lvl1]: this.treasure - this.gameVariables[gameVariableTypes.unitCostLevelOne] >= 0,
                [unitTypes.lvl2]: this.treasure - this.gameVariables[gameVariableTypes.unitCostLevelTwo] >= 0,
                [unitTypes.lvl3]:
                    this.treasure - this.gameVariables[gameVariableTypes.unitCostLevelThree] >= 0,
            },
        };
    }

    get currentIncome() {
        let income = 0;
        for (const tile of this.land) {
            if (tile.building !== null) {
                if (tile.building === buildingTypes.farm) {
                    income += this.gameVariables[gameVariableTypes.farmIncome];
                }
                if (tile.building === buildingTypes.tower1) {
                    income -= this.gameVariables[gameVariableTypes.towerOutcomeLevelOne];
                }
                if (tile.building === buildingTypes.tower2) {
                    income -= this.gameVariables[gameVariableTypes.towerOutcomeLevelTwo];
                }
            }
            if (tile.unit !== null) {
                if (tile.unit.type === unitTypes.lvl1) {
                    income -= this.gameVariables[gameVariableTypes.unitOutcomeLevelOne];
                }
                if (tile.unit.type === unitTypes.lvl2) {
                    income -= this.gameVariables[gameVariableTypes.unitOutcomeLevelTwo];
                }
                if (tile.unit.type === unitTypes.lvl3) {
                    income -= this.gameVariables[gameVariableTypes.unitOutcomeLevelThree];
                }
            }
            income += this.gameVariables[gameVariableTypes.tileIncome];
        }
        return income;
    }
}

export class Unit {
    type = "";
    makingMoveInTurn = false;

    constructor(type) {
        this.type = type;
        makeAutoObservable(this, {});
    }

    setIsMakingMove(value) {
        this.makingMoveInTurn = value;
    }
}

export class Model {
    currentTurn = -1;
    currentTurnPlayerIndex = -1;
    tilesMatrix = [];
    tilesArray = [];
    countries = [];

    constructor(tilesMatrix, tilesArray, countries) {
        this.tilesMatrix = tilesMatrix;
        this.tilesArray = tilesArray;
        this.countries = countries;
        this.nextTurn();
        makeAutoObservable(this, {});
    }

    nextTurn() {
        this.currentTurn++;
        let nextPlayer = this.currentTurnPlayerIndex;
        do {
            nextPlayer++;
            if (nextPlayer === this.countries.length) {
                nextPlayer = 0;
            }
            console.log(nextPlayer, this.countries[nextPlayer].isIgnorable);
        } while (this.countries[nextPlayer].isIgnorable);
        this.currentTurnPlayerIndex = nextPlayer;

        // update country treasure
        const currentTurnCountry = this.countries[nextPlayer];
        const newTreasure = currentTurnCountry.currentIncome + currentTurnCountry.treasure;
        currentTurnCountry.setTreasure(newTreasure);

        const units = currentTurnCountry.land.filter((tile) => tile.isHaveUnit).map((tile) => tile.unit);
        for (const unit of units) {
            unit.setIsMakingMove(false);
        }

        if (currentGame.isUserTurn) {
            let time = currentGame.info.turnDuration * 60;
            stores.ui.setGameTimer(time);
            const timerInterval = setInterval(() => {
                time--;
                stores.ui.setGameTimer(time);
            }, 1000);
            currentGame.setInterval(timerInterval);
            const timerTimeout = setTimeout(() => {
                gameService.endTurn().catch(() => {});
            }, currentGame.info.turnDuration * 60 * 1000);
            currentGame.setTimeout(timerTimeout);
        }
    }
}

const up = [0, -1];
const down = [0, 1];
const left = [-1, 0];
const right = [1, 0];
export const directionVectors = {
    up,
    down,
    left,
    right,
    leftUp: [left[0], up[1]],
    rightUp: [right[0], up[1]],
    leftDown: [left[0], down[1]],
    rightDown: [right[0], down[1]],
};
