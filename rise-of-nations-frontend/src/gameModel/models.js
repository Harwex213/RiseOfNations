export class Tile {
    row = 0;
    col = 0;
    country = null;
    building = null;
    unit = null;

    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    setCountry(country) {
        this.country = country;
    }

    setBuilding(building) {
        this.building = building;
    }

    setUnit(unit) {
        this.unit = unit;
    }
}

export class Country {
    land = [];
    color = "";
    treasure = 0;
    nextTurnIncome = 0;
    gameVariables = {};

    addTile(tile) {
        this.land.push(tile);
    }

    setColor(color) {
        this.color = color;
    }

    setGameVariables(gameVariables) {
        this.gameVariables = gameVariables;
    }
}

export class Unit {
    tile = null;
    type = "";
}

export class Model {
    currentTurn = 0;
    map = [];
    countries = [];
    units = [];

    constructor(tiles, countries) {
        this.map = tiles;
        this.countries = countries;
    }
}
