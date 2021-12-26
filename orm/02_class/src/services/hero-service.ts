import { HeroEntity } from "../entities/hero-entity";

export class HeroService {
    public async insert(data: HeroEntity){
        const hero = HeroEntity.create(data);
        await hero.save();

        return hero;
    }

    public async find(id: number){
        const tribe = await HeroEntity.findOne(id);
        return tribe;
    }
}