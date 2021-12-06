import debug from "debug";

class Hero {
  name: string = "";
  private _health: number = 100;
  protected xp: number = 2;
  hunger: number = 5;
  log;

  set health(input: number) {
    this._health = input;
  }

  get health() {
    return this._health;
  }

  constructor(name: string) {
    this.name = name;
    this.log = debug("app:hero");
    const handler = setInterval(() => {
      this.hunger--;
      this.log("remainig hunger: ", this.hunger);

      if (this.amIDead()) {
        this.log(`I'm dead`);
        clearInterval(handler);
      }
    }, 5000);
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
  sword: number = 5;

  constructor(name: string, sword: number) {
    super(name);
    this.sword = sword;
  }
}

class Soldier extends Knight {}

const archer = new Archer("archer1");
//archer.attack();

// const knight = new Knight("knight1", 6);
// //knight.attack();

// const soldier = new Soldier("soldier", 1);
//soldier.attack();

class Tribe {
  heroes: Hero[] = [];

  attack() {
    this.heroes.forEach((hero) => {
      hero.attack();
    });
  }
}

const tribe = new Tribe();
const archer2 = new Archer("archer1");
tribe.heroes?.push(archer2);
tribe.heroes?.push(new Knight("knight", 5));
tribe.heroes?.push(new Soldier("soldier", 1));

tribe.attack();
