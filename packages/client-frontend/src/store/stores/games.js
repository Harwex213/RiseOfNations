import { makeAutoObservable } from "mobx";

export default class GamesStore {
    isFetching;
    games;

    constructor() {
        this.isFetching = false;
        this.games = [];
        makeAutoObservable(this);
    }

    setIsFetching(value) {
        this.isFetching = value;
    }

    setGames(games) {
        this.games = games;
    }

    createGame(createdGame) {
        this.games.unshift(createdGame);
    }

    updateGame(updatedGame) {
        const index = this.games.findIndex((game) => game.id === updatedGame.id);
        if (index !== -1) {
            this.games[index] = updatedGame;
        }
    }

    deleteGame(deletedGame) {
        const index = this.games.findIndex((game) => game.id === deletedGame.id);
        if (index !== -1) {
            this.games.splice(index, 1);
        }
    }

    clearGames() {
        this.games = [];
    }
}
