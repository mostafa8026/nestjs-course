import { HeroEntity } from "../entities/hero-entity";
import { TribeEntity } from "../entities/tribe-entity";

export class TribeService {
  public async insert(data: TribeEntity) {
    const tribe = TribeEntity.create(data);
    await tribe.save();

    return tribe;
  }

  public async find(id: number) {
    const tribe = await TribeEntity.findOne(id);
    return tribe;
  }

  public async addHero(tribe: TribeEntity, hero: HeroEntity) {
    console.log(tribe.heroes);
    if (tribe.heroes != undefined) {
      console.log("if 1", tribe.heroes);
      tribe.heroes.push(hero);
    } else {
      tribe.heroes = [hero];
    }

    await tribe.save();

    return tribe;
  }
}
