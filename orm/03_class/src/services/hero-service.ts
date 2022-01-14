import { Like } from "typeorm";
import { HeroEntity } from "../entities/hero-entity";

export class HeroService {
  public async insert(data: HeroEntity) {
    const hero = HeroEntity.create(data);
    await hero.save();

    return hero;
  }

  public async find(id: number) {
    const hero = await HeroEntity.findOne(id);
    return hero;
  }

  public async findAll(page: number, count: number) {
    const heroes = await HeroEntity.find({
      skip: page * count,
      take: count,
      order: {
        id: "ASC",
      },
    });
    return heroes;
  }
}
