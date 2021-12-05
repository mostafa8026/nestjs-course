"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const generalLog = (0, debug_1.default)("app:general");
const speed = 100;
class Hero {
    constructor(name) {
        this.name = "";
        this.strength = 20;
        this.hunger = 20;
        this.name = name;
        this.log = (0, debug_1.default)(`app:hero:${this.name}`);
        this.makeMeWeaken();
    }
    amIDead() {
        return this.strength <= 0 || this.hunger <= 0;
    }
    attack(toWho) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.amIDead()) {
                this.log(`I'm dead :(, I can't attack`);
                return false;
            }
            this.log(`I'm attacking to ${toWho.name} ...`);
            toWho.beatenBy(this);
            this.log(`remaining strength: ${this.strength}`);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, Math.random() * speed);
            });
        });
    }
    beatenBy(fromWho) {
        this.strength--;
    }
    makeMeWeaken() {
        this.weakenIntervale = setInterval(() => {
            this.hunger--;
            //this.log("I got weaken :(, remaining hunger: ", this.hunger);
            if (this.hunger <= 0) {
                this.log(`I'm dead of starving :(`);
                clearInterval(this.weakenIntervale);
            }
        }, Math.random() * speed);
    }
}
class Knight extends Hero {
    constructor(name) {
        super(name);
        this.sword = 5;
    }
    attack(toWho) {
        const _super = Object.create(null, {
            attack: { get: () => super.attack }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sword <= 0) {
                this.log(`I don't have any swords :(`);
                return false;
            }
            if (yield _super.attack.call(this, toWho)) {
                this.log(`using sword, yeah!`);
                this.sword--;
                this.log(`remaining sword: ${this.sword}`);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, Math.random() * speed);
                });
            }
            return false;
        });
    }
    beatenBy(fromWho) {
        this.strength -= 5;
    }
}
class Tribe {
    constructor(name, heroes) {
        this.name = "";
        this.name = name;
        this.heroes = heroes;
        this.log = (0, debug_1.default)(`app:tribe:${this.name}`);
    }
    attack(enemy) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log(`Attacking to ${enemy.name}`);
            for (let i = 0; i < this.heroes.length; i++) {
                if (this.amILose()) {
                    this.log("We are losing :(");
                    generalLog(`The winner is: ${enemy.name}`);
                    return;
                }
                const randomEnemy = Math.floor(Math.random() * enemy.heroes.length);
                yield this.heroes[i].attack(enemy.heroes[randomEnemy]);
            }
            this.log(`One round has ended, let make some sleep ...`);
            this.log(`Our remainig heroes are: ${this.getRemainingHeroes().length}`);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, Math.random() * speed);
            });
        });
    }
    getRemainingHeroes() {
        return this.heroes.filter((_hero) => !_hero.amIDead());
    }
    amILose() {
        return !this.heroes.find((_hero) => !_hero.amIDead());
    }
}
function startWar(timeout = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        generalLog("War is going to be started... ");
        const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            generalLog(`In ${timeout--}`);
            if (timeout < 0) {
                clearInterval(interval);
                generalLog("Started !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
                const tribe1_hero1 = new Knight("t1 - Knight 1");
                const tribe1_hero2 = new Knight("t1 - Knight 2");
                const tribe1_hero3 = new Knight("t1 - Knight 3");
                const tribe1_hero4 = new Knight("t1 - Knight 4");
                const tribe1_hero5 = new Knight("t1 - Knight 5");
                const tribe1 = new Tribe("Tribe 1", [
                    tribe1_hero1,
                    tribe1_hero2,
                    tribe1_hero3,
                    tribe1_hero4,
                    tribe1_hero5,
                ]);
                const tribe2_hero1 = new Knight("t2 - Knight 1");
                const tribe2_hero2 = new Knight("t2 - Knight 2");
                const tribe2_hero3 = new Knight("t2 - Knight 3");
                const tribe2_hero4 = new Knight("t2 - Knight 4");
                const tribe2_hero5 = new Knight("t2 - Knight 5");
                const tribe2 = new Tribe("Tribe 2", [
                    tribe2_hero1,
                    tribe2_hero2,
                    tribe2_hero3,
                    tribe2_hero4,
                    tribe2_hero5,
                ]);
                while (!tribe1.amILose() && !tribe2.amILose()) {
                    const r = Math.random();
                    if (r > 0.5) {
                        yield tribe1.attack(tribe2);
                    }
                    else {
                        yield tribe2.attack(tribe1);
                    }
                }
                if (tribe1.amILose() && tribe2.amILose()) {
                    generalLog("All heroes are passed aways from both tribes :(");
                }
                else
                    generalLog(`The winner of this attack is: <<<<<<${tribe1.amILose() ? tribe2.name : tribe1.name}>>>>>>`);
            }
        }), 1000);
    });
}
startWar();
