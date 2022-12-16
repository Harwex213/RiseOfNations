const gameVariables = {
    tileIncome: 1,
    farmIncome: 2,
    farmCostInitial: 3,
    farmCostIncreasing: 4,
    unitMoveOnFriendTiles: 5,
    unitMoveOnEnemyTiles: 6,
    unitCostLevelOne: 7,
    unitCostLevelTwo: 8,
    unitCostLevelThree: 9,
    towerCostLevelOne: 10,
    towerCostLevelTwo: 11,
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
    gameVariables,
    statuses,
    unitTypes,
    buildingTypes,
    generationMapConfig,
};
