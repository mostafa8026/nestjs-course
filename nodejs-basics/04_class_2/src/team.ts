import { Player } from "./player";
import { PlayerInterface } from "./player-interface";

export class Team {
    name: string;
    players: PlayerInterface[];
    score: number = 0;

    constructor(name: string, players: PlayerInterface[]) {
        this.name = name;
        this.players = players;
    }

    Goal() {
        this.score++;
    }

    printScore() {
        console.log(`${this.name} score is ${this.score}`);
    }
}