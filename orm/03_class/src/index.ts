import { createConnection } from "typeorm";
import { HeroEntity } from "./entities/hero-entity";
import { TribeEntity } from "./entities/tribe-entity";
import { WarEntity } from "./entities/war-entity";
import express from "express";
import { HeroController } from "./routes/hero-controller";
import { TribeController } from "./routes/tribe-controller";

const app = express();

async function main() {
  try {
    await createConnection({
      type: "mssql",
      host: "localhost\\sql2019",
      port: 1433,
      username: "user1",
      password: "123",
      extra: {
        trustServerCertificate: true,
      },
      database: "typeorm",
      synchronize: true,
      entities: [HeroEntity, TribeEntity, WarEntity],
      logging: true,
    });

    console.log("database connected");
    app.use(express.json());
    app.use("/api/hero", HeroController);
    app.use("/api/tribe", TribeController);

    app.listen(3000, () => console.log("Listening on port 3000"));
  } catch (e: any) {
    console.error(e);
    console.log("connection error");
  }
}

main();
