import { HeroService } from "./../services/heroService";
import express from "express";

const router = express.Router();
const heroService = new HeroService();
router.post("/", (req, res) => {
  const { name } = req.body;
  const hero = heroService.insertHero(name);

  return res.json(hero);
});

export { router as heroController };
