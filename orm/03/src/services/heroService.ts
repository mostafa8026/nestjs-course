import { Hero } from "./../entities/rpg/hero";
export class HeroService {
  public async insertHero(name: string) {
    let hero = Hero.create({
      name: name,
    });
    hero = await hero.save();

    return hero;
  }

  public findHero(id: number) {
    const hero = Hero.findOne(id);

    return hero;
  }

  public async getAll() {
    const heros = await Hero.find();

    return heros;
  }

  public async delete(id: number) {
    console.log(id);
    const hero = await Hero.delete(id);

    return hero;
  }
}
