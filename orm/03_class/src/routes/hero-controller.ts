import express from "express";
import { HeroEntity } from "../entities/hero-entity";
import { HeroService } from "../services/hero-service";

const router = express.Router();
const heroService = new HeroService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const hero = new HeroEntity();
  hero.name = name;
  await heroService.insert(hero);

  return res.json(hero);
});

router.get("/", async (req, res) => {
  const { page, count } = req.query;
  const heroes = await heroService.findAll(
    parseInt(page as string),
    parseInt(count as string)
  );
  return res.json(heroes);
});

export { router as HeroController };
