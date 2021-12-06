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
class Hero {
    constructor() {
        this._name = "";
        this._health = 100;
    }
    set health(health) {
        if (health < 0 || health >= 100) {
            console.error("health must be greater than 0, asdfkajsdhf");
            return;
        }
        this._health = health;
    }
    get health() {
        this.health -= 2;
        return this._health;
    }
    set name(input) {
        this._name = input;
    }
    get name() {
        return this._name;
    }
    attack() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.move();
                console.log(`hero attacking...`);
                reject('Error occured');
            }, 2000);
        });
        return promise;
    }
}
class Enemy {
    constructor() {
        Enemy.heroCount++;
    }
    attack() {
        console.log("enemy attacking");
    }
    spies() {
        console.log("enemy spying");
    }
}
Enemy.heroCount = 0;
class Spy {
    constructor() {
        this.heroId = 123;
        this.enemyId = 123;
    }
    attack() {
        console.log("spy attacking");
    }
    spies() {
        console.log("spy spying");
    }
}
class Soldier extends Hero {
    move() {
        console.log("Soldier moving");
    }
}
class Knight extends Hero {
    constructor() {
        super(...arguments);
        this._sword = 5;
    }
    move() {
        console.log("Knight moving");
    }
    printSwordCount() {
        console.log(`Number of swords are: ${this._sword}`);
    }
}
// const heroes: Hero[] = [];
// for (let i = 0; i < 10; i++) {
//   let random = Math.random();
//   if (random < 0.1) {
//     const soldier = new Soldier();
//     heroes.push(soldier);
//   } else {
//     const knight = new Knight();
//     heroes.push(knight);
//   }
// }
// heroes.forEach((_hero) => {
//   _hero.move();
// });
// const spy1: EnemyInterface | HeroInterface = new Spy();
const soldier = new Soldier();
const knight = new Knight();
const heroes = [];
heroes.push(soldier);
heroes.push(knight);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let i = 0;
            while (i < heroes.length) {
                yield heroes[i].attack();
                i++;
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            console.log("finally");
        }
    });
}
start();
// console.log(Enemy.heroCount);
// const e = new Enemy();
// const e2 = new Enemy();
// console.log(Enemy.heroCount);
