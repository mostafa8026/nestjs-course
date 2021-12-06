"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
class Hero {
    constructor(name) {
        this.name = "";
        this._health = 100;
        this.xp = 2;
        this.hunger = 5;
        this.name = name;
        this.log = (0, debug_1.default)("app:hero");
        const handler = setInterval(() => {
            this.hunger--;
            this.log("remainig hunger: ", this.hunger);
            if (this.amIDead()) {
                this.log(`I'm dead`);
                clearInterval(handler);
            }
        }, 5000);
    }
    set health(input) {
        this._health = input;
    }
    get health() {
        return this._health;
    }
    attack() {
        this.log("Attacking");
    }
    amIDead() {
        return this._health <= 0 || this.hunger <= 0;
    }
}
class Archer extends Hero {
    attack() {
        this.log("Archer attacking");
    }
}
class Knight extends Hero {
    constructor(name, sword) {
        super(name);
        this.sword = 5;
        this.sword = sword;
    }
}
class Soldier extends Knight {
}
const archer = new Archer("archer1");
//archer.attack();
// const knight = new Knight("knight1", 6);
// //knight.attack();
// const soldier = new Soldier("soldier", 1);
//soldier.attack();
class Tribe {
    constructor() {
        this.heroes = [];
    }
    attack() {
        this.heroes.forEach((hero) => {
            hero.attack();
        });
    }
}
// const tribe = new Tribe();
// tribe.heroes?.push(new Archer("archer1"));
// tribe.heroes?.push(new Knight("knight", 5));
// tribe.heroes?.push(new Soldier("soldier", 1));
// tribe.attack();
