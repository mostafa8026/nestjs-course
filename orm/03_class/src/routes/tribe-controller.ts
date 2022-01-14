import express from "express";
import { TribeEntity } from "../entities/tribe-entity";
import { HeroService } from "../services/hero-service";
import { TribeService } from "../services/tribe-service";

const router = express.Router();
const tribeService = new TribeService();
const heroService = new HeroService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  let tribe = new TribeEntity();
  tribe.name = name;
  tribe = await tribeService.insert(tribe);

  return res.json(tribe);
});

router.put("/:tribeId/new-hero/:heroId", async (req, res) => {
  const { tribeId, heroId } = req.params;

  const tribe = await tribeService.find(parseInt(tribeId));

  console.log(`Tribe before addind new hero`, tribe);
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tribe = await tribeService.find(parseInt(id));
    if (!tribe) {
      return res.status(404).send("Tribe not found");
    }
    await tribeService.delete(parseInt(id));
    return res.json(tribe);
  } catch (e) {
    return res.status(500).send(`Error: ${e}`);
  }
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  const tribes = await tribeService.findAll((name || "") as string);
  return res.json(tribes);
});

export { router as TribeController };
