import { Between, Equal, In, LessThan, Like, Not, Raw } from "typeorm";
import { Tribe } from "./../entities/rpg/tribe";

export class TribeService {
  public async insertTribe(name: string) {
    let tribe = await Tribe.create({
      name,
    });
    tribe = await tribe.save();

    return tribe;
  }

  public async findOne(id: number) {
    const tribe = await Tribe.findOne(id);

    return tribe;
  }

  public async findOneWithRelation(id: number) {
    const tribe = await Tribe.find({
      where: { name: Like("%tribe%") },
      join: {
        alias: "tribe",
        leftJoinAndSelect: {
          hero: "tribe.heroes",
        },
      },
      take: 5,
      order: {
        id: "DESC",
      },
    });

    return tribe;
  }

  public async getByPagination(page: number, count: number) {
    const tribe = await Tribe.find({
      relations: ["heroes"],
      take: count,
      skip: page * count,
      order: {
        id: "ASC",
      },
    });

    return tribe;
  }

  public async delete(id: number) {
    const tribe = await Tribe.delete(id);

    return tribe;
  }
}
