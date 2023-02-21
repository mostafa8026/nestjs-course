import { EventsInterface } from "../interfaces/events.interface";
import { BaseRepository } from "./base.repository";

export class Events implements EventsInterface {
    id?: number;
    name: string;
    createdAt?: Date;

    constructor() {
        this.createdAt = new Date();
    }
}