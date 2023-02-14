import { Team } from "./team";

export class FootbalField {
    name: string;
    time: number = 5;
    handler: NodeJS.Timer | undefined;
    homeTeam: Team;
    awayTeam: Team;

    constructor(name: string, homeTeam: Team, awayTeam: Team) {
        this.name = name;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    startGame() {
        console.log("Game started");
        this.handler = setInterval(() => {
            this.time--;
            console.log(this.time);
        }, 1000);
        console.log('handler', this.handler);
    }

    isEnd(): boolean | string {
        return this.time === 0;
    }

    endGame() {
        console.log("Game ended");
        clearInterval(this.handler);
        if (this.homeTeam.score > this.awayTeam.score) {
            console.log(`${this.homeTeam.name} won!`);
        } else if (this.homeTeam.score < this.awayTeam.score) {
            console.log(`${this.awayTeam.name} won!`);
        } else {
            console.log("Draw");
        }

        this.homeTeam.printScore();
        this.awayTeam.printScore();
    }
}
