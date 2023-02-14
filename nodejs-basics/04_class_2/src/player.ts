import { PlayerInterface } from "./player-interface";

export class Player implements PlayerInterface {
    id: number;
    name: string;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    getIdOrName(input: number | string): number | string {
        const i = input as string;
        if(typeof input === 'string') {
            return this.id;
        } else {
            return this.name;
        }
    }
}