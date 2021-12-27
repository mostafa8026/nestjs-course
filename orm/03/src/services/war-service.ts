import { Tribe } from "./../entities/rpg/tribe";
import { War } from "../entities/rpg/war";

export class WarService {
  public async insert(name: string, location: string) {
    let war = await War.create({
      name,
      location,
    });
    war = await war.save();

    return war;
  }

  public async findOne(id: number) {
    const war = await War.findOne(id);

    return war;
  }

  public async findOneWithRelation(id: number) {
    const war = await War.find({
      select: ["location"],
      where: { id },
      relations: ["relatedTribes"],
    });

    return war;
  }

  public async delete(id: number) {
    const war = await War.delete(id);

    return war;
  }
}
