import { WarService } from "./../services/war-service";
import { HeroService } from "./../services/heroService";
import { TribeService } from "./../services/tribeService";
import express from "express";

const router = express.Router();
const tribeService = new TribeService();
const warService = new WarService();

router.post("/", async (req, res) => {
  const { name, location } = req.body;
  const war = await warService.insert(name, location);

  return res.json(war);
});

router.put("/:warId/subscribe/:tribeId", async (req, res) => {
  const { warId, tribeId } = req.params;
  let tribe = await tribeService.findOne(parseInt(tribeId));

  if (!tribe) {
    res.status(404).send("Tribe Not Found");
  }

  let war = await warService.findOne(parseInt(warId));

  if (!war) {
    res.status(404).send("War Not Found");
  }

  war.relatedTribes = [...(war.relatedTribes || []), tribe];
  war = await war.save();

  return res.json(war);
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let war = await warService.findOne(parseInt(id));

    if (!war) {
      res.status(404).send("War not found");
    }

    await warService.delete(war.id);

    return res.json(war);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Error ${e}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let war = await warService.findOneWithRelation(parseInt(id));

    if (!war) {
      res.status(404).send("War not found");
    }

    return res.json(war);
  } catch (e) {
    console.log(e);
    return res.status(500).send(`Error ${e}`);
  }
});

export { router as warController };
