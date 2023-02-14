import { Player } from './player';
import { PlayerInterface } from './player-interface'

export class DefensePlayer extends Player {
    constructor(name: string, id: number) {
        super(name, id);
    }
}