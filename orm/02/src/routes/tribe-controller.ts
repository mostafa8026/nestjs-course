import { HeroService } from "./../services/heroService";
import { TribeService } from "./../services/tribeService";
import express from "express";

const router = express.Router();
const tribeService = new TribeService();
const heroService = new HeroService();
router.post("/", (req, res) => {
  const { name } = req.body;
  const tribe = tribeService.insertTribe(name);

  return res.json(tribe);
});

router.put("/:tribeId/subscribe/:heroId", async (req, res) => {
  const { tribeId, heroId } = req.params;
  const tribe = await tribeService.findTribe(parseInt(tribeId));

  if (!tribe) {
    res.status(404).send("Tribe Not Found");
  }

  const hero = await heroService.findHero(parseInt(tribeId));

  if (!hero) {
    res.status(404).send("Hero Not Found");
  }

  return res.json(tribe);
});

export { router as tribeController };
