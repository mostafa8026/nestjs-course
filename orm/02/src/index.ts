import { War } from "./entities/rpg/war";
import { Tribe } from "./entities/rpg/tribe";
import { Hero } from "./entities/rpg/hero";
import { CategoryEntity } from "./entities/divar/category";
import { PostEntity } from "./entities/divar/post";
import { createConnection, Migration } from "typeorm";
import express from "express";
import { heroController } from "./routes/hero-controller";
import { tribeController } from "./routes/tribe-controller";

const app = express();

async function main() {
  const connection = await createConnection({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "vhdhk123!@#",
    database: "typeorm",
    extra: {
      trustServerCertificate: true,
    },
    synchronize: true,
    entities: [PostEntity, CategoryEntity, Hero, Tribe, War],
  });

  console.log("connection created");

  app.use(express.json());

  app.use("/api/hero", heroController);
  app.use("/api/tribe", tribeController);

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

main();
