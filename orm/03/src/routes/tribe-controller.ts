import { HeroService } from "./../services/heroService";
import { TribeService } from "./../services/tribeService";
import express from "express";

const router = express.Router();
const tribeService = new TribeService();
const heroService = new HeroService();
router.post("/", async (req, res) => {
  const { name } = req.body;
  const tribe = await tribeService.insertTribe(name);

  return res.json(tribe);
});

router.put("/:tribeId/subscribe/:heroId", async (req, res) => {
  const { tribeId, heroId } = req.params;
  let tribe = await tribeService.findOne(parseInt(tribeId));

  if (!tribe) {
    res.status(404).send("Tribe Not Found");
  }

  let hero = await heroService.findHero(parseInt(heroId));

  if (!hero) {
    res.status(404).send("Hero Not Found");
  }

  tribe.heroes = [...(tribe.heroes || []), hero];
  tribe = await tribe.save();

  return res.json(tribe);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let tribe = await tribeService.findOne(parseInt(id));

    if (!tribe) {
      res.status(404).send("Tribe not found");
    }

    await tribeService.delete(tribe.id);

    return res.json(tribe);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Error ${e}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let tribe = await tribeService.findOneWithRelation(parseInt(id));

    if (!tribe) {
      res.status(404).send("Tribe not found");
    }

    return res.json(tribe);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Error ${e}`);
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const { page, count } = req.query;

    let tribes = await tribeService.getByPagination(
      parseInt(page as string),
      parseInt(count as string)
    );

    return res.json(tribes);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Error ${e}`);
  }
});

export { router as tribeController };
