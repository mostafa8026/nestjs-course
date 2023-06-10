import { DataSource } from "typeorm";
import { EventEntity } from "./events.entity";
import { MetaDataEntity } from "./metadata.entity";
import { TranslationEntity } from "./translation.entity";
import { UserEntity } from "./user.entity";

const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "translation",
  username: "postgres",
  password: "postgres",
  synchronize: true,
  entities: [TranslationEntity, MetaDataEntity, UserEntity, EventEntity],
  logging: true,
});

export function initialize() {
  datasource
    .initialize()
    .then(() => {
      console.log("DataSource initialized");
    })
    .catch((err) => {
      console.error("Datasource initialization falied", err);
    });
}

export { datasource };
