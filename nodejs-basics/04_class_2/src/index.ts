import { delay } from "./utils/delay";
import { DefensePlayer } from "./defense-player";
import { FootbalField } from "./footbal-field";
import { HalfbackPlayer } from "./Halfback-player";
import { PlayerInterface } from "./player-interface";
import { Team } from "./team";

/**
 * Run the game
 */
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

    /**
     * Create a new field
     */
    const field = new FootbalField(
        'The Great Match',
        homeTeam,
        awayTeam,
        /**
         * Set the time of the game in seconds
         */
        10 // seconds
    );

    field.startGame();

    /**
     * Simulate the game
     */
    while (!field.isEnd()) {
        await delay(1000);
        const rand = Math.floor(Math.random() * 6);
        if(rand >= 3) {
            homeTeam.Goal();
        } else {
            awayTeam.Goal();
        }
    }

    /**
     * End the game
     */
    field.endGame();
}

run();