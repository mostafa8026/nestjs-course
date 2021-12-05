import debug from "debug";

const generalLog: debug.Debugger = debug("app:general");
const speed = 100;

class Hero {
  name: string = "";
  strength: number = 20;
  hunger: number = 20;
  weakenIntervale: number | undefined;
  log: debug.Debugger;

  constructor(name: string) {
    this.name = name;
    this.log = debug(`app:hero:${this.name}`);
    this.makeMeWeaken();
  }

  amIDead() {
    return this.strength <= 0 || this.hunger <= 0;
  }

  async attack(toWho: Hero): Promise<boolean> {
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
  }

  beatenBy(fromWho: Hero) {
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
  sword: number = 5;

  constructor(name: string) {
    super(name);
  }

  async attack(toWho: Hero): Promise<boolean> {
    if (this.sword <= 0) {
      this.log(`I don't have any swords :(`);
      return false;
    }
    if (await super.attack(toWho)) {
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
  }

  beatenBy(fromWho: Hero) {
    this.strength -= 5;
  }
}

class Tribe {
  name: string = "";
  heroes: Hero[];
  log: debug.Debugger;

  constructor(name: string, heroes: Hero[]) {
    this.name = name;
    this.heroes = heroes;
    this.log = debug(`app:tribe:${this.name}`);
  }

  async attack(enemy: Tribe): Promise<void> {
    this.log(`Attacking to ${enemy.name}`);
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.amILose()) {
        this.log("We are losing :(");
        generalLog(`The winner is: ${enemy.name}`);
        return;
      }
      const randomEnemy: number = Math.floor(
        Math.random() * enemy.heroes.length
      );
      await this.heroes[i].attack(enemy.heroes[randomEnemy]);
    }

    this.log(`One round has ended, let make some sleep ...`);
    this.log(`Our remainig heroes are: ${this.getRemainingHeroes().length}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.random() * speed);
    });
  }

  getRemainingHeroes(): Hero[] {
    return this.heroes.filter((_hero) => !_hero.amIDead());
  }

  amILose() {
    return !this.heroes.find((_hero) => !_hero.amIDead());
  }
}

async function startWar(timeout = 3) {
  generalLog("War is going to be started... ");
  const interval = setInterval(async () => {
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
          await tribe1.attack(tribe2);
        } else {
          await tribe2.attack(tribe1);
        }
      }

      if (tribe1.amILose() && tribe2.amILose()) {
        generalLog("All heroes are passed aways from both tribes :(");
      } else
        generalLog(
          `The winner of this attack is: <<<<<<${
            tribe1.amILose() ? tribe2.name : tribe1.name
          }>>>>>>`
        );
    }
  }, 1000);
}

startWar();
