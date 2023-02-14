import { delay } from "./utils/delay";
import { DefensePlayer } from "./defense-player";
import { FootbalField } from "./footbal-field";
import { HalfbackPlayer } from "./Halfback-player";
import { PlayerInterface } from "./player-interface";
import { Team } from "./team";

async function run() {

    const playersHome: PlayerInterface[] = [];
    playersHome.push(new DefensePlayer('Def Player 2', 2));
    playersHome.push(new DefensePlayer('Def Player 1', 1));
    playersHome.push(new DefensePlayer('Def Player 3', 3));
    playersHome.push(new HalfbackPlayer('Half Player 4', 4));

    const playersAway: PlayerInterface[] = [];
    playersAway.push(new DefensePlayer('Def Player 2', 2));
    playersAway.push(new DefensePlayer('Def Player 1', 1));
    playersAway.push(new DefensePlayer('Def Player 3', 3));
    playersAway.push(new HalfbackPlayer('Half Player 4', 4));

    const homeTeam = new Team('Home Team', playersHome);
    const awayTeam = new Team('Away Team', playersAway);

    const field = new FootbalField(
        'The Great Match',
        homeTeam,
        awayTeam
    );

    field.startGame();

    while (!field.isEnd()) {
        await delay(100);
        const rand = Math.floor(Math.random() * 6);
        if(rand >= 3) {
            homeTeam.Goal();
        } else {
            awayTeam.Goal();
        }
    }

    field.endGame();
}

run();