let eVariableInitialIndex = 1;
const gameVariableTypes = {
    tileIncome: eVariableInitialIndex++,
    farmIncome: eVariableInitialIndex++,
    farmCostInitial: eVariableInitialIndex++,
    farmCostIncreasing: eVariableInitialIndex++,
    unitMoveOnFriendTiles: eVariableInitialIndex++,
    unitMoveOnEnemyTiles: eVariableInitialIndex++,
    unitCostLevelOne: eVariableInitialIndex++,
    unitCostLevelTwo: eVariableInitialIndex++,
    unitCostLevelThree: eVariableInitialIndex++,
    towerCostLevelOne: eVariableInitialIndex++,
    towerCostLevelTwo: eVariableInitialIndex++,
    towerOutcomeLevelOne: eVariableInitialIndex++,
    towerOutcomeLevelTwo: eVariableInitialIndex++,
    unitOutcomeLevelOne: eVariableInitialIndex++,
    unitOutcomeLevelTwo: eVariableInitialIndex++,
    unitOutcomeLevelThree: eVariableInitialIndex++,
};

const actions = {
    createUnit: "createUnit",
    createBuilding: "createBuilding",
    moveUnit: "moveUnit",
    countryDestroyed: "countryDestroyed",
};

const statuses = {
    preparing: 0,
    started: 1,
    finished: 2,
};

const unitTypes = {
    lvl1: "lvl1",
    lvl2: "lvl2",
    lvl3: "lvl3",
};

const buildingTypes = {
    farm: "farm",
    tower1: "tower1",
    tower2: "tower2",
};

const generationMapConfig = {
    mapSizes: { width: 80, height: 80 },
    playersAmountToLandPercent: {
        2: {
            small: 0.05,
            medium: 0.1,
            big: 0.15,
        },
        3: {
            small: 0.1,
            medium: 0.15,
            big: 0.2,
        },
        4: {
            small: 0.15,
            medium: 0.2,
            big: 0.3,
        },
    },
    minDistanceBetweenPlayers: 8,
    landOffset: 3,
};

export const gameConstants = {
    gameVariableTypes,
    actions,
    statuses,
    unitTypes,
    buildingTypes,
    generationMapConfig,
};
