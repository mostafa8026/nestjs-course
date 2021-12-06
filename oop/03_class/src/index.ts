interface HeroInterface {
  heroId: number;

  attack(): void;
}

interface EnemyInterface {
  enemyId: number;

  attack(): void;
  spies(): void;
}

abstract class Hero implements HeroInterface {
  heroId: number;
  private _name: string = "";
  private _health: number = 100;

  set health(health: number) {
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

  set name(input: string) {
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

  abstract move(): void;
}

class Enemy implements EnemyInterface {
  static heroCount: number = 0;
  readonly enemyId: number;
  name: string;

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

class Spy implements HeroInterface, EnemyInterface {
  heroId: number = 123;
  enemyId: number = 123;

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
  private _sword: number = 5;

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
const heroes: Hero[] = [];
heroes.push(soldier);
heroes.push(knight);

async function start() {
  try {
    let i = 0;
    while (i < heroes.length) {
      await heroes[i].attack();
      i++;
    }
  } catch (e) {
    console.log(e);
  } finally {
    console.log("finally");
  }
}

start();

// console.log(Enemy.heroCount);
// const e = new Enemy();
// const e2 = new Enemy();

// console.log(Enemy.heroCount);
