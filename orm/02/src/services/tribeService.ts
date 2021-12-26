import { Tribe } from "./../entities/rpg/tribe";

export class TribeService {
  public async insertTribe(name: string) {
    const tribe = await Tribe.create({
      name,
    });
    tribe.save();

    return tribe;
  }

  public async findTribe(id: number) {
      const tribe = await Tribe.findOne(id);

      return tribe;
  }
}
