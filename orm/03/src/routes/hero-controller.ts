import { HeroService } from "./../services/heroService";
import express from "express";

const router = express.Router();
const heroService = new HeroService();
router.post("/", async (req, res) => {
  const { name } = req.body;
  const hero = await heroService.insertHero(name);

  return res.json(hero);
});

router.get("/", async (req, res) => {
  const heros = await heroService.getAll();

  return res.json(heros);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let hero = await heroService.findHero(parseInt(id));

  if (!hero) {
    res.status(404).send("Hero not found");
  }

  await heroService.delete(hero.id);

  return res.json(hero);
});

export { router as heroController };
