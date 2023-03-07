import { gameConstants } from "../../common/constants";
import * as seedrandom from "seedrandom";
import { Tile, Country, directionVectors } from "../models";

const { playersAmountToLandPercent, mapSizes, landOffset, minDistanceBetweenPlayers } =
    gameConstants.generationMapConfig;
const marks = {
    empty: -1,
    land: -2,
    coast: -3,
    player1: 0,
    player2: 1,
    player3: 2,
    player4: 3,
};
const { up, down, left, right, leftUp, rightUp, leftDown, rightDown } = directionVectors;

const getRandomGenerationFunc = (seed) => {
    const getNextRandom = seedrandom(seed);
    return (max, min = 0) => {
        return Math.floor(((getNextRandom() * 100000) % max) + min);
    };
};

const getInitParams = (playersAmount, mapSize) => {
    const landPercent = playersAmountToLandPercent[playersAmount][mapSize];
    const targetMapMass = mapSizes.width * mapSizes.height * landPercent;
    const matrix = Array.from(Array(mapSizes.width), () => {
        return Array.from(Array(mapSizes.height), () => marks.empty);
    });
    const centerPoint = [mapSizes.width / 2 - 1, mapSizes.height / 2 - 1];

    return { targetMapMass, matrix, centerPoint };
};

const markCoast = (matrix, coasts, point) => {
    if (point[0] !== landOffset && matrix[point[0] - 1][point[1]] === marks.empty) {
        coasts.push([point[0] - 1, point[1]]);
        matrix[point[0] - 1][point[1]] = marks.coast;
    }
    if (point[0] + landOffset + 1 !== mapSizes.width && matrix[point[0] + 1][point[1]] === marks.empty) {
        coasts.push([point[0] + 1, point[1]]);
        matrix[point[0] + 1][point[1]] = marks.coast;
    }
    if (point[1] !== landOffset && matrix[point[0]][point[1] - 1] === marks.empty) {
        coasts.push([point[0], point[1] - 1]);
        matrix[point[0]][point[1] - 1] = marks.coast;
    }
    if (point[1] + landOffset + 1 !== mapSizes.height && matrix[point[0]][point[1] + 1] === marks.empty) {
        coasts.push([point[0], point[1] + 1]);
        matrix[point[0]][point[1] + 1] = marks.coast;
    }
};

const generateLandWithCoast = (getRandom, matrix, targetMapMass, centerPoint) => {
    const coasts = [centerPoint];
    for (let i = 0; i < targetMapMass; i++) {
        const coastIndex = getRandom(coasts.length);
        const point = coasts[coastIndex];
        matrix[point[0]][point[1]] = marks.land;
        coasts.splice(coastIndex, 1);
        markCoast(matrix, coasts, point);
    }

    return coasts;
};

const generateCountries = (getRandom, matrix, coasts, playersAmount) => {
    let possibleSettlementArea = [...coasts];
    const setPlayerLand = (point, movement, mark) => {
        matrix[point[0] + movement[0]][point[1] + movement[1]] = mark;
    };
    for (let playerMark = marks.player1; playerMark < playersAmount; playerMark++) {
        const playerIndex = getRandom(possibleSettlementArea.length);
        const playerLand = possibleSettlementArea[playerIndex];
        matrix[playerLand[0]][playerLand[1]] = playerMark;

        possibleSettlementArea.splice(playerIndex, 1);
        possibleSettlementArea = possibleSettlementArea.filter(
            (coast) =>
                coast[0] > playerLand[0] + minDistanceBetweenPlayers ||
                coast[1] > playerLand[1] + minDistanceBetweenPlayers ||
                coast[0] < playerLand[0] - minDistanceBetweenPlayers ||
                coast[1] < playerLand[1] - minDistanceBetweenPlayers
        );

        setPlayerLand(playerLand, up, playerMark);
        setPlayerLand(playerLand, down, playerMark);
        setPlayerLand(playerLand, left, playerMark);
        setPlayerLand(playerLand, right, playerMark);
        setPlayerLand(playerLand, leftUp, playerMark);
        setPlayerLand(playerLand, rightUp, playerMark);
        setPlayerLand(playerLand, leftDown, playerMark);
        setPlayerLand(playerLand, rightDown, playerMark);
    }
};

const markCoastAsLand = (matrix, coasts) => {
    for (const coast of coasts) {
        matrix[coast[0]][coast[1]] = marks.land;
    }
};

const matrixMapToModels = (matrix, playersAmount) => {
    const tiles = [];
    const countries = [...new Array(playersAmount)].map(() => new Country());

    for (let row = 0; row < matrix.length; row++) {
        const tilesRow = [];
        for (let col = 0; col < matrix[row].length; col++) {
            const mark = matrix[row][col];

            if (mark === marks.empty) {
                tilesRow.push(null);
            } else if (mark === marks.land) {
                tilesRow.push(new Tile(row, col));
            } else {
                const countryIndex = mark;
                const tile = new Tile(row, col);
                tile.setCountryIndex(countryIndex);
                countries[countryIndex].addTile(tile);
                tilesRow.push(tile);
            }
        }
        tiles.push(tilesRow);
    }

    return [tiles, countries];
};

export const generateMap = ({ seed, playersAmount, mapSize }) => {
    const startTime = performance.now();

    const getRandom = getRandomGenerationFunc(seed);
    const { matrix, targetMapMass, centerPoint } = getInitParams(playersAmount, mapSize);
    const coasts = generateLandWithCoast(getRandom, matrix, targetMapMass, centerPoint);
    markCoastAsLand(matrix, coasts);
    generateCountries(getRandom, matrix, coasts, playersAmount);
    const result = matrixMapToModels(matrix, playersAmount);

    const endTime = performance.now();
    console.log(`Map generation complete for ${endTime - startTime} ms.`);

    return result;
};
