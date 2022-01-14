import { LessThan, LessThanOrEqual, Like, Not, Raw } from "typeorm";
import { HeroEntity } from "../entities/hero-entity";
import { TribeEntity } from "../entities/tribe-entity";

export class TribeService {
  public async insert(data: TribeEntity) {
    const tribe = TribeEntity.create(data);
    return await tribe.save();
  }

  public async find(id: number) {
    const tribe = await TribeEntity.findOne(id, {
      relations: ["heroes"],
    });
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

  public async delete(id: number) {
    return TribeEntity.delete(id);
  }

  public async findAll(filterName: string) {
    const tribes = await TribeEntity.find({
      where: {
        name: Not(Like(`%${filterName}%`)),
        id: Raw('2*3')
      },
      join: {
        alias: "tribe",
        leftJoinAndSelect: {
          hero: "tribe.heroes",
        },
      },
    });
    return tribes;
  }
}
