import express from "express";
import { TribeEntity } from "../entities/tribe-entity";
import { HeroService } from "../services/hero-service";
import { TribeService } from "../services/tribe-service";

const router = express.Router();
const tribeService = new TribeService();
const heroService = new HeroService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const tribe = new TribeEntity();
  tribe.name = name;
  await tribeService.insert(tribe);

  return res.json(tribe);
});

router.put("/:tribeId/new-hero/:heroId", async (req, res) => {
  const { tribeId, heroId } = req.params;

  const tribe = await tribeService.find(parseInt(tribeId));

  if (!tribe) {
    res.status(404).send("Tribe nor found");
  }

  const hero = await heroService.find(parseInt(heroId));

  if (!hero) {
    res.status(404).send("Hero nor found");
  }

  const updatedTribe = await tribeService.addHero(tribe, hero);

  return res.json(updatedTribe);
});

export { router as TribeController };
