import { Hero } from "./../entities/rpg/hero";
export class HeroService {
  public insertHero(name: string) {
    const hero = Hero.create({
      name: "John",
    });
    hero.save();

    return hero;
  }

  public findHero(id: number) {
    const hero = Hero.findOne(id);

    return hero;
}
}
